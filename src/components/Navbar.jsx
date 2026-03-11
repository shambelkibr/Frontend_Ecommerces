import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function navClass({ isActive }) {
  return isActive
    ? "rounded-full bg-amber-700 px-4 py-2 text-white"
    : "rounded-full px-4 py-2 text-amber-900 hover:bg-amber-100";
}

export default function Navbar() {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-amber-200 bg-amber-50/90 backdrop-blur">
      <div className="page-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link to="/" className="text-xl font-bold text-amber-900">
          Areke Market
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          {!isAuthenticated && (
            <>
              <NavLink to="/" className={navClass}>
                Home
              </NavLink>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navClass}>
                Register
              </NavLink>
            </>
          )}

          {isAuthenticated && role === "buyer" && (
            <>
              <NavLink to="/" className={navClass}>
                Home
              </NavLink>
              <NavLink to="/cart" className={navClass}>
                Cart
              </NavLink>
              <NavLink to="/orders" className={navClass}>
                My Orders
              </NavLink>
              <NavLink to="/order-tracking" className={navClass}>
                Tracking
              </NavLink>
            </>
          )}

          {isAuthenticated && role === "seller" && (
            <>
              <NavLink to="/seller/dashboard" className={navClass}>
                Dashboard
              </NavLink>
              <NavLink to="/seller/add-product" className={navClass}>
                Add Product
              </NavLink>
              <NavLink to="/seller/products" className={navClass}>
                Products
              </NavLink>
              <NavLink to="/seller/orders" className={navClass}>
                Orders
              </NavLink>
              <NavLink to="/seller/upload-license" className={navClass}>
                Upload License
              </NavLink>
            </>
          )}

          {isAuthenticated && role === "admin" && (
            <>
              <NavLink to="/admin/dashboard" className={navClass}>
                Dashboard
              </NavLink>
              <NavLink to="/admin/sellers" className={navClass}>
                Sellers
              </NavLink>
              <NavLink to="/admin/users" className={navClass}>
                Users
              </NavLink>
              <NavLink to="/admin/orders" className={navClass}>
                Orders
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-teal-700 px-4 py-2 text-white hover:bg-teal-800"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
