import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./core/layout/Navbar";
import Footer from "./core/layout/Footer";
import ProtectedRoute from "./core/guards/ProtectedRoute";

// Core Public & Products
import Landing from "./features/public/Landing";
import Home from "./features/public/Home";
import ProductDetails from "./features/products/ProductDetails";

// Auth
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

// Buyer / Orders
import Cart from "./features/orders/Cart";
import Checkout from "./features/orders/Checkout";
import Orders from "./features/orders/Orders";
import OrderTracking from "./features/orders/OrderTracking";

// Seller Dashboard
import SellerDashboard from "./features/dashboard/seller/SellerDashboard";
import AddProduct from "./features/dashboard/seller/AddProduct";
import ManageProductsSeller from "./features/dashboard/seller/ManageProducts";
import SellerOrders from "./features/dashboard/seller/SellerOrders";
import UploadLicense from "./features/dashboard/seller/UploadLicense";

// Admin Dashboard
import AdminDashboard from "./features/dashboard/admin/AdminDashboard";
import VerifySellers from "./features/dashboard/admin/VerifySellers";
import ManageUsers from "./features/dashboard/admin/ManageUsers";
import ManageProducts from "./features/dashboard/admin/ManageProducts";
import ManageOrders from "./features/dashboard/admin/ManageOrders";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="glass-header">
        <Navbar />
      </div>
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Buyer Routes */}
          <Route path="/cart" element={<ProtectedRoute allowedRoles={["buyer"]}><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute allowedRoles={["buyer"]}><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute allowedRoles={["buyer"]}><Orders /></ProtectedRoute>} />
          <Route path="/order-tracking" element={<ProtectedRoute allowedRoles={["buyer"]}><OrderTracking /></ProtectedRoute>} />

          {/* Seller Routes */}
          <Route path="/seller/dashboard" element={<ProtectedRoute allowedRoles={["seller"]}><SellerDashboard /></ProtectedRoute>} />
          <Route path="/seller/add-product" element={<ProtectedRoute allowedRoles={["seller"]}><AddProduct /></ProtectedRoute>} />
          <Route path="/seller/products" element={<ProtectedRoute allowedRoles={["seller"]}><ManageProductsSeller /></ProtectedRoute>} />
          <Route path="/seller/orders" element={<ProtectedRoute allowedRoles={["seller"]}><SellerOrders /></ProtectedRoute>} />
          <Route path="/seller/upload-license" element={<ProtectedRoute allowedRoles={["seller"]}><UploadLicense /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/sellers" element={<ProtectedRoute allowedRoles={["admin"]}><VerifySellers /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute allowedRoles={["admin"]}><ManageProducts /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={["admin"]}><ManageOrders /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}
