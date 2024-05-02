import { authContext } from './authContext';
import { useState } from 'react';

export function AuthContextProvider({ children }) {
    /**
     * States
     */
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    /**
     * Functions
     */
    const updateUser = (usuario) => {
        localStorage.setItem('user', JSON.stringify(usuario));
        setUser(usuario);
    };

    const updateIsAuthenticated = (estado) => setIsAuthenticated(estado);

    const updateToken = (token) => {
        localStorage.setItem('access_token', token);
        setToken(token);
    };

    const resetUser = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const resetToken = () => {
        localStorage.removeItem('access_token');
        setToken(null);
    };

    /**
     * RETURN
     */
    return (
        <authContext.Provider
            value={{
                // context,
                user,
                isAuthenticated,
                token,
                updateUser,
                resetUser,
                updateIsAuthenticated,
                updateToken,
                resetToken,
            }}
        >
            {children}
        </authContext.Provider>
    );
}
