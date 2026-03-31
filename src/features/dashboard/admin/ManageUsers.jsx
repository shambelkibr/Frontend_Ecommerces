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

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      // Setup your GET /users route securely in backend (authMiddleware + adminMiddleware)
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently from Liyu ልብስ?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr] max-w-7xl mx-auto py-10 px-4 animate-fade-in transition-colors duration-300">
      <Sidebar links={links} title="Admin Portal" />
      
      <div className="space-y-6">
        <div className="card p-6 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">User Accounts</h1>
              <p className="text-gray-600 dark:text-gray-400">View and manage buyers, sellers, and administrators.</p>
            </div>
            <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg font-bold">
              {users.length} Total Users
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
                {loading ? (
                  <tr>
                     <td colSpan="4" className="px-6 py-8 text-center text-gray-500 animate-pulse">Loading users...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                     <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No users found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 font-bold flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 flex items-center justify-center font-bold">
                           {user.name.charAt(0).toUpperCase()}
                        </div>
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                           user.role === 'admin' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                           user.role === 'seller' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                           'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="px-3 py-1.5 text-sm font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 rounded-md transition-colors"
                          disabled={user.role === 'admin'}
                        >
                          {user.role === 'admin' ? 'Protected' : 'Remove'}
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
