import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedAuthRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default ProtectedAuthRoute;
