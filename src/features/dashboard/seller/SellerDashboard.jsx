import Sidebar from "../../../core/layout/Sidebar";

const links = [
  { to: "/seller/dashboard", label: "Dashboard Overview" },
  { to: "/seller/add-product", label: "Add New Product" },
  { to: "/seller/products", label: "Manage Inventory" },
  { to: "/seller/orders", label: "Fulfill Orders" },
  { to: "/seller/upload-license", label: "Business License" },
];

export default function SellerDashboard() {
  return (
    <div className="grid gap-8 md:grid-cols-[280px_1fr] animate-fade-in fade-in h-full">
      <Sidebar links={links} title="Seller Portal" />
      
      <div className="space-y-6">
        <div className="card p-6 md:p-8 bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-xl shadow-orange-500/20">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome Back! ✨</h1>
          <p className="text-orange-100 text-lg">
            Manage your clothing inventory, unfulfilled orders, and shop licenses from your enterprise dashboard.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-6">
          <div className="card p-6 border border-gray-100 hover:border-orange-200 transition-colors">
            <h3 className="text-gray-500 font-semibold mb-1">Active Products</h3>
            <p className="text-4xl font-black text-gray-900">0</p>
          </div>
          <div className="card p-6 border border-gray-100 hover:border-orange-200 transition-colors bg-orange-50">
            <h3 className="text-orange-800 font-semibold mb-1">Unfulfilled Orders</h3>
            <p className="text-4xl font-black text-orange-600">0</p>
          </div>
          <div className="card p-6 border border-gray-100 hover:border-orange-200 transition-colors">
            <h3 className="text-gray-500 font-semibold mb-1">Lifetime Revenue</h3>
            <p className="text-4xl font-black text-gray-900">0 <span className="text-lg">ETB</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
