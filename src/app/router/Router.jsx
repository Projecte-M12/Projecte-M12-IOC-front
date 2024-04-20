import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../views/homepage/Homepage";
import { Login } from "../views/auth/Login/Login";
import { Signup } from "../views/auth/Signup/Signup";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { CompanyDashboard } from "../views/dashboard/company/CompanyDashboard";
import { CustomerDashboard } from "../views/dashboard/customer/CustomerDashboard";
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
