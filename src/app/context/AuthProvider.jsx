import { authContext } from './authContext';
import { useProvideAuth } from '../hooks/useProvideAuth';

export function AuthProvider({ children }) {
    const auth = useProvideAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}
