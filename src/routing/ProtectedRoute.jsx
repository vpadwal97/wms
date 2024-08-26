import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/appSlice";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn !== true) {
    return <Navigate to="/Login" />;
  }
  return children;
};

export default ProtectedRoute;
