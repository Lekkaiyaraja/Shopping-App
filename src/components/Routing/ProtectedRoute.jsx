import React from "react";
import { getUser } from "../../Services/userServices";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const location = useLocation()
    
    
  return getUser() ? <Outlet /> : <Navigate to="/login" state ={{from: location.pathname}} />;
};

export default ProtectedRoute;
