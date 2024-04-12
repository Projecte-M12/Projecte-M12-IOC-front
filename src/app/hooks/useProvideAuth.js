import { useEffect, useState } from 'react';
import { constants } from '../shared/constants';

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tokenLocalStorage, setTokenLocalStorage] = useState(null);
    // const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleDataUser = (rawData) => {
        if (rawData) {
            // TODO: Revisar no solo si hay datos (en caso de error los hay) sino los datos que debería haber en caso de respuesta correcta
            const data = formatDataUser(rawData);
            setTokenLocalStorage(localStorage.getItem('access_token'));

            console.log('handleDataUser')
            console.log(data);

            if (!isAuthenticated) {
                if (
                    data.access_token &&
                    data.access_token === tokenLocalStorage
                ) {
                    setIsAuthenticated(true);
                    setUser(data.user);
                    console.log('El token de la petición es el mismo que el del localStorage')
                } else if (data.access_token) {
                    setTokenLocalStorage(data.access_token);
                    setIsAuthenticated(true);
                    setUser(data.user);
                    console.log("L'usuari s'ha autenticat correctament")

                    // localStorage.setItem('access_token', tokenLocalStorage);
                    // localStorage.setItem('user', user);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    console.log("Les credencials no son correctes")
                    // localStorage.removeItem('access_token');
                    // localStorage.removeItem('user');
                }
            }

            setLoading(false);
            return data;
        } else {
            setLoading(false);
            setIsAuthenticated(false);
            setUser(false);
            return false;
        }
    };

    // Amb async/await

    // const signin = async (email, password) => {
    //     const response = await fetch(`${constants.API_URL}/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             email,
    //             password,
    //         }),
    //     });
    //     response.json().then((data) => {
    //         console.log(data);
    //     });
    // };

    // Amb Promisse
    const signin = (email, password) => {
        setLoading(true);

        const response = fetch(`${constants.API_URL}/login`, {
            // signal, // TODO: Implementar el signal con un AbortController para cancelar las llamadas si hay nuevas
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                // TODO: Añadir boolean de remember me para el backend a la hora de generar la fecha de expiración del token
            }),
        });
        response
            .then((res) =>
                res
                    .json()
                    .then((data) => {
                        if (data.error) {
                            console.log(data.error);
                            // setError(data.error);
                            setLoading(false);
                        } else {
                            handleDataUser(data);
                        }
                        // TODO: Dependiendo de la respuesta:
                        // 1. Si es correcto: Generar token y guardarlo en el localStorage

                        // 2. Si no: Mostrar mensaje de error
                        // console.log({ data });
                        // console.log({ user: dataUser.user });
                    })
                    .catch((err) => console.error('Error parsing JSON', err)),
            )
            .catch((err) => console.error('Fetch error', err));
    };

    const signout = () => {
        return handleDataUser(false);
    };

    useEffect(() => {
        if (!localStorage.getItem('access_token') && tokenLocalStorage) {
            localStorage.setItem('access_token', tokenLocalStorage);
        }
        if (!localStorage.getItem('user') && user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user, tokenLocalStorage]);

    useEffect(() => {
        const unsuscribe = () => {
            // TODO: Cancelar suscripción en caso de ser necesario
            // handleUser
        };

        return unsuscribe();
    }, []);

    return { user, loading, signin, signout };
};

function formatDataUser(dataUser) {
    return {
        access_token: dataUser.access_token,
        expires_in: dataUser.expires_in,
        token_type: dataUser.token_type,
        user: formatUser(dataUser.user),
    };
}

function formatUser(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.displayName,
        email_verified_at: user.email_verified_at,
        updated_at: user.updated_at,
    };
}
