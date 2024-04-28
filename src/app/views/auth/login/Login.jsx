/*
 * ----- React
 */
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

/**
 * Utils
 */
import { isValidEmail, isValidPassword } from '../../../utils/validations';

/*
 * ----- Hooks
 */
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogin } from '../../../hooks/useLogin';
import { useCheckUser } from '../../../hooks/useCheckUser';

/*
 * ----- Components propis
 */
import { Input } from '../../../shared/components/Input/Input.jsx';
import { Button } from '../../../shared/components/Button/Button.jsx';
import { Header } from '../../../shared/components/Header/Header';

/*
 * ----- Styles + Images
 */
import './Login.css';
import { iconStyleDefault } from '../../../styles/iconStyles';
import logo from '../../../assets/logo/reservanow_logo.svg';
import { FaUser, FaLock } from 'react-icons/fa';
import eyeOpen from '../../../assets/icons/eyeopen.svg';
import eyeCrossed from '../../../assets/icons/eyecrossed.svg';

/*
 * ----- Component Log In
 */
export const Login = () => {
    /*
     * ----- Custom Hooks
     */
    const { checkToken } = useCheckUser();
    useEffect(() => {
        checkToken();
    }, []);

    /*
     * ------ States
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
        if (user && user.is_company) {
            return <Navigate to="/company-dashboard" replace />;
        } else {
            return <Navigate to="/customer-dashboard" replace />;
        }
    }

    /*
     * ----- Return
     */
    return (
        <>
            <Header />
            {/* {isAuthenticated ? (
                user.is_company ? (
                    <Navigate to="/company-dashboard" replace />
                ) : (
                    <Navigate to="/customer-dashboard" replace />
                )
            ) : null} */}
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
                    <h3>Inicia sessió</h3>
                    <div className="login__form--input-box">
                        <div className="login__form-icon">
                            <FaUser style={iconStyleDefault} />
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
                        <div className="login__form-icon">
                            <FaLock style={iconStyleDefault} />
                        </div>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            required
                            value={password}
                        />
                        {/* Per defecte s'oculta la contrasenya */}

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

                    <div className="login__remember">
                        {/* TODO: Canviar a component ? */}
                        <label htmlFor="remember">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                            />
                        </label>
                        <p>Remember me</p>
                    </div>
                    <div>
                        <a href="#">Forgot password?</a>
                    </div>
                    {/* <button
                        className="login__login-form__submit-btn"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={
                            !isValidEmail(email) || !isValidPassword(password)
                        }
                    >
                        Login
                    </button> */}
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
        </>
    );
};
