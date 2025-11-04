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
  { path: "/customer", element: <Customer screen="overview" /> },
  { path: "/customer/add", element: <Customer screen="add" /> },
  { path: "/customer/update", element: <Customer screen="update" /> },
  { path: "/products", element: <Products screen="overview" /> },
  { path: "/products/add", element: <Products screen="add" /> },
  { path: "/products/update", element: <Products screen="update" /> },
  { path: "/orders", element: <Orders screen="overview" /> },
  { path: "/orders/add", element: <Orders screen="add" /> },
  { path: "/orders/details", element: <Orders screen="details" /> },
  { path: "/reports", element: <Reports /> },
  { path: "/manage-staff", element: <ManageStaff screen="overview" /> },
  { path: "/manage-staff/add", element: <ManageStaff screen="add" /> },
  { path: "/manage-staff/update", element: <ManageStaff screen="update" /> },
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
