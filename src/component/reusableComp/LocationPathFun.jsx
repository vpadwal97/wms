import React from "react";
import { useLocation } from "react-router-dom";

function LocationPathFun(to) {
  const location = useLocation();
  const isActive = location.pathname.toLowerCase() === to.toLowerCase();
  return isActive ? "active" : "notActive" ;
}

export default LocationPathFun;
