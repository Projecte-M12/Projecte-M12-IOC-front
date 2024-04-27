import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './app/context/AuthContextProvider';
import { Router } from './app/router/Router';

import './app/styles/main_styles.css';
import { AppointmentsContextProvider } from './app/context/AppointmentsContextProvider';

function App() {
    return (
        <>
            <AuthContextProvider>
                <AppointmentsContextProvider>
                    <RouterProvider router={Router} />
                </AppointmentsContextProvider>
            </AuthContextProvider>
        </>
    );
}

export default App;
