import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageOrders from "./pages/Admin/ManageOrders";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManageUsers from "./pages/Admin/ManageUsers";
import VerifySellers from "./pages/Admin/VerifySellers";
import Cart from "./pages/Buyer/Cart";
import Checkout from "./pages/Buyer/Checkout";
import Orders from "./pages/Buyer/Orders";
import OrderTracking from "./pages/Buyer/OrderTracking";
import AddProduct from "./pages/Seller/AddProduct";
import ManageProductsSeller from "./pages/Seller/ManageProducts";
import SellerDashboard from "./pages/Seller/SellerDashboard";
import SellerOrders from "./pages/Seller/SellerOrders";
import UploadLicense from "./pages/Seller/UploadLicense";
import Home from "./pages/Public/Home";
import Landing from "./pages/Public/Landing";
import Login from "./pages/Public/Login";
import ProductDetails from "./pages/Public/ProductDetails";
import Register from "./pages/Public/Register";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["buyer"]}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["buyer"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute allowedRoles={["buyer"]}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-tracking"
            element={
              <ProtectedRoute allowedRoles={["buyer"]}>
                <OrderTracking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/add-product"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/products"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <ManageProductsSeller />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/orders"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/upload-license"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <UploadLicense />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sellers"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <VerifySellers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageOrders />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
