import Sidebar from "../../components/Sidebar";

const links = [
  { to: "/seller/dashboard", label: "Dashboard" },
  { to: "/seller/products", label: "Manage Products" },
  { to: "/seller/orders", label: "Seller Orders" },
  { to: "/seller/upload-license", label: "Upload License" },
];

export default function SellerDashboard() {
  return (
    <div className="page-shell grid gap-4 md:grid-cols-[240px_1fr]">
      <Sidebar links={links} />
      <div className="card-surface p-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <p className="mt-3">
          Manage products, orders, and upload your trading license.
        </p>
      </div>
    </div>
  );
}
