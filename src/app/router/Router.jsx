import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../views/Homepage/Homepage";
import { Login } from "../views/auth/Login/Login";
import { Signup } from "../views/auth/Signup/Signup";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { CompanyDashboard } from "../views/dashboard/Company/CompanyDashboard";
import { CustomerDashboard } from "../views/dashboard/Customer/CustomerDashboard";
import { Welcomepage } from "../views/Welcomepage/Welcomepage";

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/Welcomepage',
    element: <Welcomepage />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Signup',
    element: <Signup />,
  },
  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/Company-dashboard',
        element: <CompanyDashboard />,
      },
      {
        path: '/Customer-dashboard',
        element: <CustomerDashboard />,
      },
    ],
  },
]);
