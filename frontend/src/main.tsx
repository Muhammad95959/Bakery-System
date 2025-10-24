import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Customer from "./pages/Customer.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import ManageStaff from "./pages/ManageStaff.tsx";
import Orders from "./pages/Orders.tsx";
import Products from "./pages/Products.tsx";
import Reports from "./pages/Reports.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/customer", element: <Customer /> },
  { path: "/products", element: <Products /> },
  { path: "/orders", element: <Orders /> },
  { path: "/reports", element: <Reports /> },
  { path: "/manage-staff", element: <ManageStaff /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
