import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleProtectedRoute({ allowedRoles, children }) {

    const { auth } = useAuth();

    if (!auth.token) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(auth.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default RoleProtectedRoute;