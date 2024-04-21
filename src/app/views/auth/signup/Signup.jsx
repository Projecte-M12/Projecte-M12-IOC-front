/**
 * React
 */
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

/**
 * Utils
 */
import { isValidEmail, isValidPassword } from '../../../utils/validations';

/**
 * Custom hooks
 */
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogin } from '../../../hooks/useLogin';
import { useCheckUser } from '../../../hooks/useCheckUser';

/**
 * Styles
 */
import '../Auth.scss';
import {
    iconStyleDefault,
    iconStyleGreen,
    iconStyleRed,
} from '../../../styles/iconStyles';
import logo from '../../../assets/logo/reservanow_logo.svg';
import { FaUser, FaLock } from 'react-icons/fa';
import { useSignup } from '../../../hooks/useSignUp';

export const Signup = () => {
    /**
     * Custom Hooks
     */
    const { checkToken } = useCheckUser();
    useEffect(() => {
        checkToken();
    }, []);

    /**
     * States
     */
    // const [confirmedPassword, setConfirmedPrePassword] = useState('');
    const { isAuthenticated, user } = useAuthContext();

    // Hay que crear un useSignup con su propio estado
    const {
        email,
        password,
        loading,
        error,
        message,
        signedUp,
        isCompany,
        passwordConfirmation,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleNameChange,
        handleIsCompanyChange,
        hadleServide,
        handleSubmit,
    } = useSignup();

    /**
     * Funciones
     */
    if (signedUp) {
        setTimeout(() => {
            console.log('Registrat');
            return <Navigate to="/login" />;
        }, 2000);
    }

    /**
     * Comprobación usuario logueado y redirección
     */
    if (isAuthenticated) {
        if (user && user.is_company) {
            return <Navigate to="/customer-dashboard" replace />;
        } else {
            return <Navigate to="/company-dashboard" replace />;
        }
    }

    return (
        <main className="main__login">
            <div className="login-logo">
                <img src={logo} className="login__logo" alt="Logo ReservaNOW" />
            </div>
            <form className="login__login-form">
                <h1 className="login__title">Signup</h1>
                <div className="login__login-form__input-box">
                    <input
                        type="text"
                        className="login__login-form__input"
                        placeholder="Email"
                        onChange={handleEmailChange}
                        required
                        value={email}
                    />
                    <div className="login__login-form__icon">
                        <FaUser style={iconStyleDefault} />
                    </div>
                </div>
                {!isValidEmail && email ? (
                    <div className="login__login-form__error">
                        {"L'email no és correcte"}
                    </div>
                ) : null}
                <div className="login__login-form__input-box">
                    <input
                        type="password"
                        className="login__login-form__input"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        required
                        value={password}
                    />
                    <div className="login__login-form__icon">
                        <FaLock style={iconStyleDefault} />
                    </div>
                </div>
                {!isValidPassword(password) && password ? (
                    <div className="login__login-form__error">
                        At least: 8 characters - One number - One uppercase -
                        One lowercase
                    </div>
                ) : null}
                <div className="login__login-form__input-box">
                    <input
                        type="password"
                        className="login__login-form__input"
                        placeholder="Confirma el password"
                        value={passwordConfirmation}
                        onChange={handlePasswordConfirmationChange}
                        required
                        // value={password}
                    />
                    <div className="login__login-form__icon">
                        <FaLock
                            style={
                                password && password === passwordConfirmation
                                    ? iconStyleGreen
                                    : password
                                      ? iconStyleRed
                                      : iconStyleDefault
                            }
                        />
                    </div>
                </div>

                <div className="login__login-form__input-box">
                    <input
                        type="checkbox"
                        id="is_company"
                        value={isCompany}
                        onChange={handleIsCompanyChange}
                    />
                    <label htmlFor="is_company">Soc una empresa</label>
                </div>
                {isCompany && (
                    <>
                        <div className="login__login-form__input-box">
                            <select
                                name="servicio"
                                className="login__login-form__input"
                                // defaultValue={''}
                                onChange={hadleServide}
                            >
                                <option value="" disabled>
                                    Selecciona...
                                </option>
                                <option value="1">
                                    Aquí va un map de los servicios
                                </option>
                                <option value="2">Aquí va otra cosa</option>
                            </select>
                        </div>
                        <div className="login__login-form__input-box">
                            <input
                                type="text"
                                name="nombreEmpresa"
                                className="login__login-form__input"
                                placeholder="Nom de l'empresa"
                                onChange={handleNameChange}
                            />
                        </div>
                    </>
                )}

                <button
                    className="login__login-form__submit-btn"
                    // type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    disabled={
                        !isValidEmail(email) ||
                        !isValidPassword(password) ||
                        !passwordConfirmation ||
                        password !== passwordConfirmation
                    }
                >
                    Signup
                </button>
                <div className="login__login-form__signup">
                    Ja tens un compte? <Link to="/login">Login</Link>
                </div>
            </form>
            {/* TODO: Donar estil al missatge d'error */}
            {message && <div className="">{message}</div>}
        </main>
    );
};
