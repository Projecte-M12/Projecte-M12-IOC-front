import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './app/context/AuthContextProvider';
import { Router } from './app/router/Router';

import './app/styles/main_styles.css';

function App() {
    return (
        <>
            <AuthContextProvider>
                <RouterProvider router={Router} />
            </AuthContextProvider>
        </>
    );
}

export default App;
