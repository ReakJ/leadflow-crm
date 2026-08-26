import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import PageLoader from "../components/common/PageLoader";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute;