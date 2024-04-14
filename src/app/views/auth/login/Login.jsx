import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { authContext } from '../../../context/authContext';

import '../Auth.scss';
import { iconStyleDefault } from '../../../styles/iconStyles';
import logo from '../../../assets/logo/reservanow_logo.svg';
import { FaUser, FaLock } from 'react-icons/fa';

import { API_BASE_URL, EDPOINT } from '../../../utils/constants';
import { isValidEmail, isValidPassword } from '../../../utils/validations';

export const Login = () => {
    /**
     * States
     */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {
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
    } = useContext(authContext);

    // if (auth.isAunthenticated) {
    //   <Navigate to="/customer-dashboard" />;
    // }

    const hadleSubmit = (e) => {
        e.preventDefault();
        if (isValidEmail && isValidPassword(password)) {
            // TODO: ENVIAR DATOS A LA API
        }
    };

    return (
        <main className="main__login">
            <div className="login__logo-container">
                <img src={logo} className="login__logo" alt="Logo ReservaNOW" />
            </div>
            <form onSubmit={hadleSubmit} className="login__login-form">
                <h1 className="login__title">Login</h1>
                <div className="login__login-form__input-box">
                    <input
                        type="text"
                        className="login__login-form__input"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        value={email}
                    />
                    <div className="login__login-form__icon">
                        <FaUser style={iconStyleDefault} />
                    </div>
                </div>
                {!isValidEmail && email ? (
                    <div className="login__login-form__error">
                        Username must be larger than 3 characters
                    </div>
                ) : null}
                <div className="login__login-form__input-box">
                    <input
                        type="password"
                        className="login__login-form__input"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        value={password}
                    />
                    <div className="login__login-form__icon">
                        <FaLock style={iconStyleDefault} />
                    </div>
                </div>
                {!isValidPassword(password) && password ? (
                    <div className="login__login-form__error">
                        At least 8 characters, 1 number, 1 uppercase, 1
                        lowercase
                    </div>
                ) : null}
                <div className="login__login-form__remember">
                    <label htmlFor="remember">
                        <input type="checkbox" name="remember" id="remember" />
                    </label>
                    <p>Remember me</p>
                </div>
                <div>
                    <a href="#">Forgot password?</a>
                </div>
                <button className="login__login-form__submit-btn" type="submit">
                    Login
                </button>
                <div className="login__login-form__signup">
                    {"Don't have an account?"} <a href="/signup">Signup</a>
                </div>
            </form>
        </main>
    );
};
