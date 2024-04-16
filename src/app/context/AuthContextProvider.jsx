import { authContext } from './authContext';
import { useContext, useState } from 'react';

export function AuthContextProvider({ children }) {
    /**
     * States
     */
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    /**
     * Context
     */
    const context = useContext(authContext);

    /**
     * Functions
     */
    const updateUser = (usuario) => setUser(usuario);
    const deleteUser = () => setUser(null);

    const updateIsAuthenticated = () => setIsAuthenticated((prev) => !prev);

    const updateToken = (token) => setToken(token);
    const resetToken = () => setToken(null);

    /**
     * RETURN
     */
    return (
        <authContext.Provider
            value={{
                context,
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
