import Sidebar from "../../../core/layout/Sidebar";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/sellers", label: "Verify Sellers" },
  { to: "/admin/users", label: "Manage Users" },
  { to: "/admin/products", label: "Manage Products" },
  { to: "/admin/orders", label: "Manage Orders" },
];

export default function AdminDashboard() {
  return (
    <div className="page-shell grid gap-4 md:grid-cols-[240px_1fr]">
      <Sidebar links={links} />
      <div className="card-surface p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-3">
          Approve sellers, monitor orders, and review platform activity.
        </p>
      </div>
    </div>
  );
}
