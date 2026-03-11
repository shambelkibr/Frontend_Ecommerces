import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleCheckout() {
    setLoading(true);
    setMessage("");
    try {
      await api.post("/orders/checkout");
      setMessage("Order created successfully.");
      setTimeout(() => navigate("/orders"), 900);
    } catch (error) {
      setMessage(error?.response?.data?.message || "Checkout failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell max-w-xl">
      <div className="card-surface p-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-2 text-amber-900/70">Payment Method: CBE Birr</p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-5 rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Processing..." : "Create Order"}
        </button>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </div>
    </div>
  );
}
