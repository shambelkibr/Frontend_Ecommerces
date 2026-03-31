import Sidebar from "../../../core/layout/Sidebar";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/sellers", label: "Verify Shops" },
  { to: "/admin/users", label: "Manage Users" },
  { to: "/admin/products", label: "Manage Products" },
  { to: "/admin/orders", label: "Manage Orders" },
];

export default function AdminDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr] max-w-7xl mx-auto py-10 px-4 animate-fade-in transition-colors duration-300">
      <Sidebar links={links} title="Admin Portal" />
      
      <div className="space-y-6">
        <div className="card p-6 md:p-10 bg-white dark:bg-gray-800 dark:border-gray-700 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:bg-none">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome to Command Center</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Monitor the Liyu ልብስ marketplace, approve new sellers, and maintain high-quality local clothing commerce.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none">
            <h3 className="text-orange-100 font-bold mb-1">Total Sales</h3>
            <p className="text-3xl font-black">124k ETB</p>
          </div>
          <div className="card p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-gray-500 dark:text-gray-400 font-bold mb-1">Active Shops</h3>
            <p className="text-3xl font-black text-gray-900 dark:text-white">12</p>
          </div>
          <div className="card p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-gray-500 dark:text-gray-400 font-bold mb-1">Pending Approvals</h3>
            <p className="text-3xl font-black text-orange-600 dark:text-orange-400">3</p>
          </div>
          <div className="card p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-gray-500 dark:text-gray-400 font-bold mb-1">Total Users</h3>
            <p className="text-3xl font-black text-gray-900 dark:text-white">840</p>
          </div>
        </div>

        {/* Recent Activity Mockup */}
        <div className="card p-6 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">Recent Platform Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <p className="text-gray-600 dark:text-gray-300"><span className="font-bold text-gray-900 dark:text-white">Order #1024</span> was delivered to Kebele 04.</p>
              <span className="ml-auto text-gray-400">2m ago</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <p className="text-gray-600 dark:text-gray-300"><span className="font-bold text-gray-900 dark:text-white">New Shop Registration:</span> "Debre Birhan Weavers" requires approval.</p>
              <span className="ml-auto text-gray-400">1h ago</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <p className="text-gray-600 dark:text-gray-300"><span className="font-bold text-gray-900 dark:text-white">New User</span> signed up as a buyer.</p>
              <span className="ml-auto text-gray-400">3h ago</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
