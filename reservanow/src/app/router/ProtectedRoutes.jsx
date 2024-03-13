import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

export function ProtectedRoutes() {
  const auth = useAuth();
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
