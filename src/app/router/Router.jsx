/**
 * React 
 */
import { createBrowserRouter } from 'react-router-dom';

/**
 * Components pròpis
 */
import { Homepage } from '../views/homepage/Homepage';
import { Login } from '../views/auth/login/Login';
import { Signup } from '../views/auth/signup/Signup';
import { ProtectedRoutes } from './ProtectedRoutes';
import { CompanyDashboard } from '../views/dashboard/company/CompanyDashboard';
import { CustomerDashboard } from '../views/dashboard/customer/CustomerDashboard';
import { Welcomepage } from '../views/Welcomepage/Welcomepage';
import { AvisLegal } from '../views/politiques/AvisLegal';
import { Privacitat } from '../views/politiques/Privacitat';
import { Cookies } from '../views/politiques/Cookies';

/**
 * Crea el router de l'aplicació amb les rutes i els components corresponents.
 * @returns {Object} L'objecte que defineix les rutes de l'aplicació.
 */
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
        path: '/politiques/avis-legal',
        element: <AvisLegal />,
    },
    {
        path: '/politiques/privacitat',
        element: <Privacitat />,
    },
    {
        path: '/politiques/cookies',
        element: <Cookies />,
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
