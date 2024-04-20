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

    const deleteUser = () => setUser(null);

    const updateIsAuthenticated = () => setIsAuthenticated((prev) => !prev);

    const updateToken = (token) => {
        console.log('updateToken');
        console.log(token);
        // localStorage.removeItem('access_token');
        localStorage.setItem('access_token', token);
        setToken(token);
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
                deleteUser,
                updateIsAuthenticated,
                updateToken,
                resetToken,
            }}
        >
            {children}
        </authContext.Provider>
    );
}
