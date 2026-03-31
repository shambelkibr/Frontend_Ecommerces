import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import Sidebar from "../../../core/layout/Sidebar";

const links = [
  { to: "/seller/dashboard", label: "Dashboard" },
  { to: "/seller/setup-shop", label: "Shop Setup" },
  { to: "/seller/products", label: "My Products" },
  { to: "/seller/orders", label: "Order Management" },
];

export default function ShopRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shop_name: "",
    description: "",
    address: "",
    status: "pending"
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/sellers/shop/register", formData);
      toast.success("Shop application submitted successfully! Pending approval from Admin.");
      navigate("/seller/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr] max-w-7xl mx-auto py-10 px-4 animate-fade-in transition-colors duration-300">
      <Sidebar links={links} title="Seller Portal" />
      
      <div className="card max-w-2xl w-full mx-auto p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
          Open Your Liyu ልብስ Shop
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Register your local Debre Birhan clothing business to start selling your unique traditional wears.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
              Shop Name (የሱቅ ስም)
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="e.g. Asrat Cultural Clothes"
              value={formData.shop_name}
              onChange={(e) => setFormData({...formData, shop_name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
              Description (መግለጫ)
            </label>
            <textarea
              required
              rows="4"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Tell us about the clothing you sell..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
              Kebele / Address (አድራሻ)
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="e.g. Kebele 04, Next to Arada"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 rounded-xl font-bold text-lg disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            {loading ? "Submitting Application..." : "Submit Shop Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
