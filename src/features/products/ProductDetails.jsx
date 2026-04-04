import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null));
  }, [id]);

  async function addToCart() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (role !== "buyer") {
      setMessage("Only buyer accounts can add products to cart.");
      return;
    }

    try {
      await api.post("/orders/cart", {
        productId: product.id,
        quantity: Number(quantity),
      });
      setMessage("Product added to cart.");
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Unable to add product to cart.",
      );
    }
  }

  if (!product) {
    return <div className="page-shell">Product not found.</div>;
  }

  return (
    <div className="page-shell card-surface p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-2 text-sm text-amber-900/70 dark:text-amber-200/80">
        Seller: {product.seller_name}
      </p>
      <p className="mt-4">{product.description}</p>
      <p className="mt-4 text-2xl font-semibold text-amber-800 dark:text-amber-200">
        {Number(product.price).toFixed(2)} Birr
      </p>
      <div className="mt-5 flex items-center gap-3">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-24 rounded-lg border border-amber-300 dark:border-amber-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2"
        />
        <button
          type="button"
          onClick={addToCart}
          className="rounded-lg bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 px-4 py-2 font-semibold text-white transition-colors"
        >
          Add To Cart
        </button>
      </div>
      {message && (
        <p className="mt-3 text-sm text-amber-900 dark:text-amber-100">
          {message}
        </p>
      )}
    </div>
  );
}
