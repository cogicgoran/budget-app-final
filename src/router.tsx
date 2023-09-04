import { Navigate, createBrowserRouter } from "react-router-dom";
import DashboardPage from "./components/dashboard/DashboardPage";
import AuthenticationPage from "./components/auth/AuthenticationPage";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
  {
    path: "/auth",
    Component: AuthenticationPage,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
]);
