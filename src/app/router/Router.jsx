import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../views/homepage/Homepage";
import { Login } from "../views/auth/login/Login";
import { Signup } from "../views/auth/signup/Signup";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { CompanyDashboard } from "../views/dashboard/company/CompanyDashboard";
import { CustomerDashboard } from "../views/dashboard/customer/CustomerDashboard";
import { Welcomepage } from "../views/Welcomepage/Welcomepage";

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Welcomepage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/homepage',
        element: <Homepage />,
      },
      {
        path: '/company-dashboard',
        element: <CompanyDashboard />,
      },
      {
        path: '/customer-dashboard',
        element: <CustomerDashboard />,
      },
    ],
  },
]);
