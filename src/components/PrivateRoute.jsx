import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-ink-950"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink-600 border-t-volt" /></div>;

  if (!user) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;

  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}
