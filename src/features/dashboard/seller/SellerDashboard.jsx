import { useEffect, useState } from "react";
import Sidebar from "../../../core/layout/Sidebar";
import api from "../../../services/api";

const links = [
  { to: "/seller/dashboard", label: "Dashboard" },
  { to: "/seller/setup-shop", label: "Shop Setup" },
  { to: "/seller/products", label: "My Products" },
  { to: "/seller/orders", label: "Order Management" },
];

export default function SellerDashboard() {
  const [shopInfo, setShopInfo] = useState(null);

  useEffect(() => {
    // Ideally fetch /sellers/shop/me to get status
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr] max-w-7xl mx-auto py-10 px-4 animate-fade-in transition-colors duration-300">
      <Sidebar links={links} title="Seller Portal" />
      
      <div className="space-y-6">
        <div className="card p-6 md:p-10 bg-white dark:bg-gray-800 dark:border-gray-700 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:bg-none">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">My Liyu ልብስ Shop</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage your traditional clothing products, handle orders, and view sales performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none shadow-lg">
            <h3 className="text-orange-100 font-bold mb-1">Total Sales</h3>
            <p className="text-3xl font-black">12,500 ETB</p>
          </div>
          <div className="card p-6 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
            <h3 className="text-gray-500 dark:text-gray-400 font-bold mb-1">Active Products</h3>
            <p className="text-3xl font-black text-gray-900 dark:text-white">8</p>
          </div>
          <div className="card p-6 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
            <h3 className="text-gray-500 dark:text-gray-400 font-bold mb-1">Pending Orders</h3>
            <p className="text-3xl font-black text-orange-600 dark:text-orange-400">2</p>
          </div>
        </div>

        <div className="card p-6 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
           <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">
             Quick Actions
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="/seller/setup-shop" className="block p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 transition-colors text-center group">
                 <span className="block text-gray-900 dark:text-white font-bold mb-1 group-hover:text-orange-500">Apply / Manage Shop</span>
                 <span className="text-sm text-gray-500 dark:text-gray-400">Update your store profile and check approval status.</span>
              </a>
              <a href="/seller/products" className="block p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 transition-colors text-center group">
                 <span className="block text-gray-900 dark:text-white font-bold mb-1 group-hover:text-orange-500">Add New Product</span>
                 <span className="text-sm text-gray-500 dark:text-gray-400">List new cultural clothes and variants.</span>
              </a>
           </div>
        </div>

      </div>
    </div>
  );
}
