import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
