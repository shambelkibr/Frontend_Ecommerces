import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]));
  }, []);

  async function handleAddToCart(product) {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (role !== "buyer") {
      setNotice("Only buyer accounts can add products to cart.");
      return;
    }

    try {
      await api.post("/orders/cart", { productId: product.id, quantity: 1 });
      setNotice(`Added ${product.name} to cart.`);
    } catch (error) {
      setNotice(error?.response?.data?.message || "Failed to add to cart.");
    }
  }

  return (
    <div className="page-shell">
      <section className="card-surface p-8">
        <h1 className="text-4xl font-bold text-amber-900">
          Buy Authentic Debre Birhan Areke
        </h1>
        <p className="mt-3 max-w-2xl text-amber-900/80">
          Discover local sellers, verified licenses, and secure CBE Birr
          payments.
        </p>
        {notice && (
          <p className="mt-4 rounded-lg border border-amber-300 bg-amber-100 px-3 py-2 text-sm text-amber-900">
            {notice}
          </p>
        )}
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </section>
    </div>
  );
}
