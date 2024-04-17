import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export function ProtectedRoutes() {
  const auth = useAuthContext();
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
