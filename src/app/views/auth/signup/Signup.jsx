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
import { iconStyleDefault, iconStyleGreen } from '../../../styles/iconStyles';
import logo from '../../../assets/logo/reservanow_logo.svg';
import { FaUser, FaLock } from 'react-icons/fa';

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
    const [confirmedPassword, setConfirmedPrePassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const { isAuthenticated, user } = useAuthContext();

    // Hay que crear un useSignup con su propio estado
    const {
        email,
        password,
        loading,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
    } = useLogin();

    /**
     * Funciones
     */
    const handleCheckboxChange = () => setIsChecked(!isChecked);

    /**
     * Comprobación usuario logueado y redirección
     */
    if (isAuthenticated) {
        if (user && user.is_company) {
            return <Navigate to="/customer-dashboard" replace/>;
        } else {
            return <Navigate to="/company-dashboard" replace/>;
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
                        onChange={(e) =>
                            setConfirmedPrePassword(e.target.value)
                        }
                        required
                        // value={password}
                    />
                    <div className="login__login-form__icon">
                        <FaLock
                            style={
                                password && password === confirmedPassword
                                    ? iconStyleGreen
                                    : iconStyleDefault
                            }
                        />
                    </div>
                </div>

                <div className="login__login-form__input-box">
                    <input
                        type="checkbox"
                        id="is_company"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="is_company">Soc una empresa</label>
                </div>
                {isChecked && (
                    <>
                        <div className="login__login-form__input-box">
                            <select
                                name="servicio"
                                className="login__login-form__input"
                            >
                                <option value="" disabled selected>
                                    Selecciona...
                                </option>
                                <option value="">
                                    Aquí va un map de los servicios
                                </option>
                            </select>
                        </div>
                        <div className="login__login-form__input-box">
                            <input
                                type="text"
                                name="nombreEmpresa"
                                className="login__login-form__input"
                                placeholder="Nom de l'empresa"
                            />
                        </div>
                    </>
                )}

                <button
                    className="login__login-form__submit-btn"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Signup
                </button>
                <div className="login__login-form__signup">
                    Ja tens un compte?{' '}
                    <Link to="/login" replace>
                        Login
                    </Link>
                </div>
            </form>
        </main>
    );
};
