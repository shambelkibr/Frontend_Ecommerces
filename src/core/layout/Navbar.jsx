import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";

function navClass({ isActive }) {
  return isActive
    ? "rounded-full bg-orange-600 px-4 py-2 text-white shadow-sm transition-all text-sm font-bold"
    : "rounded-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400 transition-all text-sm font-medium";
}

function mobileNavClass({ isActive }) {
  return isActive
    ? "block w-full text-left px-4 py-3 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold rounded-xl transition-colors"
    : "block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-xl transition-colors";
}

export default function Navbar() {
  const { isAuthenticated, role, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Theme Toggle State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" || 
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Reusable Theme Button
  const ThemeToggleBtn = ({ isMobile }) => (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${isMobile ? 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 self-start mt-2' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? (
        // Sun Icon
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
      ) : (
        // Moon Icon
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
      )}
      {isMobile && <span className="ml-3 font-medium text-sm">Toggle Theme</span>}
    </button>
  );

  return (
    <header className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 tracking-tight z-50">
          Liyu ልብስ
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {!isAuthenticated && (
            <>
              <NavLink to="/landing" className={navClass}>Home</NavLink>
              <NavLink to="/login" className={navClass}>Login</NavLink>
              <NavLink to="/register" className={navClass}>Register</NavLink>
            </>
          )}

          {isAuthenticated && role === "buyer" && (
            <>
              <NavLink to="/" className={navClass}>Shop</NavLink>
              <NavLink to="/cart" className={navClass}>Cart</NavLink>
              <NavLink to="/orders" className={navClass}>My Orders</NavLink>
              <NavLink to="/order-tracking" className={navClass}>Tracking</NavLink>
            </>
          )}

          {isAuthenticated && role === "seller" && (
            <>
              <NavLink to="/seller/dashboard" className={navClass}>Dashboard</NavLink>
              <NavLink to="/seller/products" className={navClass}>Inventory</NavLink>
              <NavLink to="/seller/orders" className={navClass}>Orders</NavLink>
            </>
          )}

          {isAuthenticated && role === "admin" && (
            <>
              <NavLink to="/admin/dashboard" className={navClass}>System</NavLink>
              <NavLink to="/admin/sellers" className={navClass}>Verifications</NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3 z-50">
          {/* Desktop Theme Toggle */}
          <div className="hidden md:block">
            <ThemeToggleBtn isMobile={false} />
          </div>

          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              className="hidden md:block rounded-full bg-gray-900 border-2 border-transparent px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-900"
            >
              Logout
            </button>
          )}
          
          {/* Hamburger Menu Button for Small Screens */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl py-4 px-4 flex flex-col gap-2 animate-fade-in z-40 transition-colors duration-300">
          {!isAuthenticated && (
            <>
              <NavLink onClick={toggleMenu} to="/landing" className={mobileNavClass}>Home</NavLink>
              <NavLink onClick={toggleMenu} to="/login" className={mobileNavClass}>Login</NavLink>
              <NavLink onClick={toggleMenu} to="/register" className={mobileNavClass}>Register</NavLink>
            </>
          )}

          {isAuthenticated && role === "buyer" && (
            <>
              <NavLink onClick={toggleMenu} to="/" className={mobileNavClass}>Shop</NavLink>
              <NavLink onClick={toggleMenu} to="/cart" className={mobileNavClass}>Cart</NavLink>
              <NavLink onClick={toggleMenu} to="/orders" className={mobileNavClass}>My Orders</NavLink>
              <NavLink onClick={toggleMenu} to="/order-tracking" className={mobileNavClass}>Tracking</NavLink>
            </>
          )}

          {isAuthenticated && role === "seller" && (
            <>
              <NavLink onClick={toggleMenu} to="/seller/dashboard" className={mobileNavClass}>Dashboard</NavLink>
              <NavLink onClick={toggleMenu} to="/seller/products" className={mobileNavClass}>Inventory</NavLink>
              <NavLink onClick={toggleMenu} to="/seller/orders" className={mobileNavClass}>Orders</NavLink>
            </>
          )}

          {isAuthenticated && role === "admin" && (
            <>
              <NavLink onClick={toggleMenu} to="/admin/dashboard" className={mobileNavClass}>System</NavLink>
              <NavLink onClick={toggleMenu} to="/admin/sellers" className={mobileNavClass}>Verifications</NavLink>
            </>
          )}

          <div className="my-2 border-t border-gray-100 dark:border-gray-800 pt-3">
             {/* Mobile Theme Toggle Button */}
             <div onClick={toggleMenu} className="flex px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl cursor-pointer">
                <ThemeToggleBtn isMobile={true} />
             </div>
          </div>

          {isAuthenticated && (
            <button
              onClick={() => { toggleMenu(); logout(); }}
              className="mt-2 w-full rounded-xl bg-gray-900 dark:bg-gray-700 px-4 py-3 text-left font-bold text-white shadow-md dark:shadow-none"
            >
              Logout Account
            </button>
          )}
        </div>
      )}
    </header>
  );
}
