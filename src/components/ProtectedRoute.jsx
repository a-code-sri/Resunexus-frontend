import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function ProtectedRoute({ children }) {

    const auth = useAuth();
    if (auth.loading){
        return (

            <div className="flex justify-center items-center h-screen">

                Loading...

            </div>

        );

    }
    if (!auth.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}