import { useEffect, useState } from "react";
import api from "../../../services/api";
import Sidebar from "../../../core/layout/Sidebar";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/sellers", label: "Verify Shops" },
  { to: "/admin/users", label: "Manage Users" },
  { to: "/admin/products", label: "Manage Products" },
  { to: "/admin/orders", label: "Manage Orders" },
];

export default function VerifySellers() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  function loadPending() {
    setLoading(true);
    api
      .get("/sellers/shops/pending")
      .then((res) => {
         setShops(res.data || []);
      })
      .catch(() => setShops([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadPending();
  }, []);

  async function review(id, status) {
    try {
      await api.patch(`/sellers/shops/${id}/review`, { status });
      loadPending();
    } catch (e) {
      alert("Failed to update status");
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr] max-w-7xl mx-auto py-10 px-4 animate-fade-in transition-colors duration-300">
      <Sidebar links={links} title="Admin Portal" />
      
      <div className="card p-6 md:p-10 bg-white dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pending Shops (Sellers)</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Review and approve new local clothing shops to join Liyu ልብስ.</p>
        
        {loading ? (
           <p className="text-gray-500 dark:text-gray-400">Loading pending shops...</p>
        ) : shops.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <span className="text-4xl mb-4 block">🏬</span>
            <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">No pending shops awaiting approval.</p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">All sellers are currently verified.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {shops.map((shop) => (
              <div key={shop.id} className="border border-gray-100 dark:border-gray-700 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-orange-200 dark:hover:border-orange-900/50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{shop.name}</h2>
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                      {shop.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-1"><span className="font-bold">Owner:</span> {shop.seller_name} ({shop.seller_email})</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-1"><span className="font-bold">Address:</span> {shop.address}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 border-t border-gray-200 dark:border-gray-700/50 pt-3">
                    {shop.description}
                  </p>
                </div>
                
                <div className="flex md:flex-col gap-3 shrink-0">
                  <button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm"
                    onClick={() => review(shop.id, "approved")}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 border border-red-200 dark:border-red-900/50 px-6 py-2.5 rounded-xl font-bold transition-colors"
                    onClick={() => review(shop.id, "rejected")}
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
