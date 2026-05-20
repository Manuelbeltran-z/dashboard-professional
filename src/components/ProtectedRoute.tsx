import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
