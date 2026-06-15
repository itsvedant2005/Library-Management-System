import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  role
}) {

  const token =
    localStorage.getItem(
      role === "admin"
        ? "adminToken"
        : "token"
    );

  if (!token) {
    return (
      <Navigate to="/" />
    );
  }

  return children;
}

export default ProtectedRoute;