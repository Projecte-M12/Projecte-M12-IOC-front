import { authContext } from './authContext';
import { useContext, useState } from 'react';

export function AuthContextProvider({ children }) {
    /**
     * States
     */
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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

    const updateIsAuthentocated = () => setIsAuthenticated((prev) => !prev);

    const updateLoading = () => setLoading((prev) => !prev);

    const updateError = (error) => setError(error);
    const resetError = () => setError(null);

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
                loading,
                error,
                token,
                updateUser,
                deleteUser,
                updateIsAuthentocated,
                updateLoading,
                updateError,
                resetError,
                updateToken,
                resetToken,
            }}
        >
            {children}
        </authContext.Provider>
    );
}
