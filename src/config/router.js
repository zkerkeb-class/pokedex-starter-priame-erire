import React from 'react';
import {
  Outlet,
  createBrowserRouter,
  useNavigate,
  useLocation,
  Navigate
} from "react-router-dom";
import Home from "./screens/Home";
import Pokemon from "./screens/pokemon";
import Create from "./screens/Create";
import Edit from "./screens/Edit";
import Connec from "./screens/Connec";
import Cruser from "./screens/Cruser";
import { isAuthenticated } from "../services/api";

// Create a separate component for the protected layout
const ProtectedLayout = () => {
  const auth = isAuthenticated();
  
  if (!auth) {
    return React.createElement(Navigate, { to: "/connection", replace: true });
  }
  
  // Return Outlet to render nested routes
  return React.createElement(Outlet, null);
};

console.log("Router configuration loaded");

const router = createBrowserRouter([
  // Public routes
  {
    path: "/connection",
    Component: Connec
  },
  {
    path: "/create_account",
    Component: Cruser
  },
 
  // Protected routes
  {
    element: React.createElement(ProtectedLayout, null),
    children: [
      {
        path: "/",
        Component: Home
      },
      {
        path: "/pokemon/:id",
        Component: Pokemon
      },
      {
        path: "/create",
        Component: Create
      },
      {
        path: "/edit/:id",
        Component: Edit
      }
    ]
  }
]);

export default router;