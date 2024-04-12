import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../views/homepage/Homepage";
import { Login } from "../views/auth/login/Login";
import { Signup } from "../views/auth/signup/Signup";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { CompanyDashboard } from "../views/dashboard/company/CompanyDashboard";
import { CustomerDashboard } from "../views/dashboard/customer/CustomerDashboard";


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
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
