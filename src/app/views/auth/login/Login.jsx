/**
 * React
 */
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

/**
 * Utils
 */
import { isValidEmail, isValidPassword } from '../../../utils/validations';

/**
 *  Hooks
 */
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogin } from '../../../hooks/useLogin';
import { useCheckUser } from '../../../hooks/useCheckUser';

/**
 * Components propis
 */
import { Input } from '../../../shared/components/Input/Input.jsx';
import { Button } from '../../../shared/components/Button/Button.jsx';
import { Header } from '../../../shared/components/Header/Header';
import { Footer } from '../../../shared/components/Footer/Footer.jsx';

/**
 * Styles
 */
import './Login.css';

/**
 * Imatges i Icons
 */
import logo from '../../../assets/logo/reservanow_logo.svg';
import mailLetter from '../../../assets/icons/mail.svg';
import passwordKey from '../../../assets/icons/keyAccount.svg';
import eyeOpen from '../../../assets/icons/eyeopen.svg';
import eyeCrossed from '../../../assets/icons/eyecrossed.svg';

/**
 * Component de log in per autenticar els usuaris.
 * Redirigeix a la pàgina de dashboard corresponent si l'usuari ja està autenticat.
 * @returns {JSX.Element} El component de log in.
 */
export const Login = () => {
    /**
     * Custom Hooks
     */
    const { checkToken } = useCheckUser();
    useEffect(() => {
        checkToken();
    }, []);

    /**
     * Estats
     */
    const {
        email,
        password,
        loading,
        error,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
    } = useLogin();

    const { isAuthenticated, user } = useAuthContext();

    // Oculta o mostra la contrassenya
    const [showPassword, setShowPassword] = useState(false);

    if (isAuthenticated) {
        if (user && user.company_name) {
            return <Navigate to="/company-dashboard" replace />;
        } else {
            return <Navigate to="/customer-dashboard" replace />;
        }
    }

    /**
     *  Rentorna el render del component Login
     */
    return (
        <>
            <Header />
            <main className="login__container">
                {isAuthenticated && <Navigate to="/" />}
                <div className="login__logo-container">
                    <img
                        src={logo}
                        className="login__logo"
                        alt="Logo ReservaNOW"
                    />
                </div>
                <form className="login__form-container">
                    <h1 className="login__form-title">Hola de nou ;)</h1>
                    <h2>Inicia sessió</h2>
                    <div className="login__form--input-box">
                        <div className="signup__form-icon">
                            <img src={mailLetter} alt="email" />
                        </div>
                        <Input
                            type="email"
                            placeholder="Correu"
                            onChange={handleEmailChange}
                            value={email}
                        />
                    </div>
                    {!isValidEmail(email) && email ? (
                        <div className="login__form-error">
                            Format d'email no vàlid
                        </div>
                    ) : null}
                    <div className="login__form--input-box">
                        <div className="signup__form-icon">
                            <img src={passwordKey} alt="password" />
                        </div>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            required
                            value={password}
                        />

                        <button
                            type="button"
                            className="login__password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <img src={eyeOpen} alt="Oculta contrasenya" />
                            ) : (
                                <img
                                    src={eyeCrossed}
                                    alt="Mostra contrasenya"
                                />
                            )}
                        </button>
                    </div>
                    {!isValidPassword(password) && password ? (
                        <div className="login__form-error">
                            La contrasenya ha de tenir com a mínim 8 caràcters,
                            1 número, 1 majúscula i 1 minúscula
                        </div>
                    ) : null}

                    {error && (
                        <div className="login__error">{error.message}</div>
                    )}

                    <div className="login__form--input-box">
                        {/* TODO: Canviar a component ? */}
                        <label htmlFor="remember">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                className="login__rememberCheckbox"
                            />
                            Remember me
                        </label>
                    </div>
                    <div>
                        <a href="#">Forgot password?</a>
                    </div>

                    {/* Botó personalitzat que envia les dades per validar l'inici de sessió */}
                    <Button
                        text="Login"
                        action={handleSubmit}
                        disabled={
                            !isValidEmail(email) || !isValidPassword(password)
                        }
                        type="submit"
                    />
                    <div className="redirect_signup">
                        {'Encara no tens un compte?'}{' '}
                        <Link to="/Signup" className="text-accent" replace>
                            Registra't
                        </Link>
                    </div>
                </form>
            </main>

            {/* Contingut del Footer */}
            <Footer />
        </>
    );
};
