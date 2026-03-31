import { useEffect, useState } from "react";
import Sidebar from "../../../core/layout/Sidebar";
import api from "../../../services/api";
import { toast } from "react-toastify";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/sellers", label: "Verify Shops" },
  { to: "/admin/users", label: "Manage Users" },
  { to: "/admin/products", label: "Manage Products" },
  { to: "/admin/orders", label: "Manage Orders" },
];

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      // Example endpoint: await api.delete(`/admin/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr] max-w-7xl mx-auto py-10 px-4 animate-fade-in transition-colors duration-300">
      <Sidebar links={links} title="Admin Portal" />
      
      <div className="space-y-6">
        <div className="card p-6 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Active Catalog</h1>
              <p className="text-gray-600 dark:text-gray-400">Review and moderate products listed by sellers.</p>
            </div>
            <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg font-bold">
              {products.length} Items Listed
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Shop Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 animate-pulse">Loading items...</td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No products found.</td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 font-bold">{p.name}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{p.shop_name || "Unknown Shop"}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {p.category_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-medium">{p.price} ETB</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="px-3 py-1.5 text-sm font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 rounded-md transition-colors"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
