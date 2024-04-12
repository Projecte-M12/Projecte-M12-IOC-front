import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoutes() {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
}
