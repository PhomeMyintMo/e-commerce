// import React from "react"
// import { useAuth } from "./contexts/AuthContext";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute: React.FC<{}> = () => {
//     const { user, loading } = useAuth();
//     if (loading) return <div>Loading....</div>;
//     if (!user) return <Navigate to="/login" replace />;
//     return <Outlet/>;
// }

// export default ProtectedRoute;