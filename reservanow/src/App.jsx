import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Homepage } from "./app/views/homepage/Homepage.jsx";
import { Login } from "./app//views/auth/login/Login.jsx";
import { Signup } from "./app/views/auth/signup/Signup.jsx";
import { CompanyDashboard } from "./app/views/dashboard/company/CompanyDashboard.jsx";
import { CustomerDashboard } from "./app/views/dashboard/customer/CustomerDashboard.jsx";
import { ProtectedRoutes } from "./app/router/ProtectedRoutes.jsx";
import { AuthProvider } from "./app/context/AuthProvider.jsx";

import "./App.css";
import "./app/styles/reset.css";
import "./app/styles/variables.scss";
import "./app/styles/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/company-dashboard",
        element: <CompanyDashboard />,
      },
      {
        path: "/customer-dashboard",
        element: <CustomerDashboard />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
