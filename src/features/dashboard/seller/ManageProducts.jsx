import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  function loadProducts() {
    api
      .get("/products")
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function removeProduct(id) {
    await api.delete(`/products/${id}`);
    loadProducts();
  }

  return (
    <div className="page-shell">
      <h1 className="text-3xl font-bold">Manage Products</h1>
      <div className="mt-5 space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="card-surface flex items-center justify-between p-4"
          >
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm">{Number(product.price).toFixed(2)} Birr</p>
            </div>
            <button
              className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white"
              onClick={() => removeProduct(product.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
