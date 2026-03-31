import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { loading, isAuthenticated, role } = useAuth();

  if (loading) {
    return <div className="page-shell">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
