import { useState } from "react";
import api from "../../services/api";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", Number(form.price));
    formData.append("quantity", Number(form.quantity));

    if (form.categoryId) {
      formData.append("categoryId", form.categoryId);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Product added successfully.");
      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
        categoryId: "",
      });
      setImageFile(null);
    } catch (error) {
      setMessage(error?.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell max-w-2xl">
      <form onSubmit={handleSubmit} className="card-surface p-6">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <input
          className="mt-4 w-full rounded-lg border border-amber-300 p-3"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="mt-3 w-full rounded-lg border border-amber-300 p-3"
          placeholder="Category ID"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        />
        <input
          className="mt-3 w-full rounded-lg border border-amber-300 p-3"
          placeholder="Price"
          type="number"
          min="0"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          className="mt-3 w-full rounded-lg border border-amber-300 p-3"
          placeholder="Quantity"
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <textarea
          className="mt-3 w-full rounded-lg border border-amber-300 p-3"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="mt-3 block w-full"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
        <button
          disabled={loading}
          className="mt-4 rounded-lg bg-amber-700 px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </form>
    </div>
  );
}
