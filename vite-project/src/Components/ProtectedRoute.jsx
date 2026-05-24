import { Navigate, Outlet, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedRoute = ({ allowedRole }) => {
  const { authUser, session, isLoading } = useAuth();
  const { uid: routeUid } = useParams();

  if (isLoading) {
    return <Typography sx={{ p: 4, textAlign: "center" }}>Checking session...</Typography>;
  }

  if (!authUser || !session) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && session.role !== allowedRole) {
    const fallbackPath = session.role === "admin" ? "/admin" : `/customer/${session.uid}`;
    return <Navigate to={fallbackPath} replace />;
  }

  if (routeUid && routeUid !== session.uid) {
    const fallbackPath = session.role === "admin" ? "/admin" : `/customer/${session.uid}`;
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
