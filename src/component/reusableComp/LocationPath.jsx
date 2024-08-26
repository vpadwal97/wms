import React from "react";
import { useLocation } from "react-router-dom";

// Custom component to apply active styles without link functionality
function LocationPath({ to, children }) {
  const location = useLocation();
  // const isActive = location.pathname.toLowerCase().includes(to.toLowerCase());
  const isActive = location.pathname.toLowerCase() === to.toLowerCase();

  return <div className={`${isActive ? "active" : ""}`}>{children}</div>;
}

export default LocationPath;
