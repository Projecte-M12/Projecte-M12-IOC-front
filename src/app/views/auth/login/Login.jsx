/**
 * React
 */
import { Link, Navigate } from 'react-router-dom';

/**
 * Utils
 */
import { isValidEmail, isValidPassword } from '../../../utils/validations';

/**
 * Hooks
 */
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogin } from '../../../hooks/useLogin';
import { useCheckUser } from '../../../hooks/useCheckUser';

/**
 * Styles
 */
import '../Auth.scss';
import { iconStyleDefault } from '../../../styles/iconStyles';
import logo from '../../../assets/logo/reservanow_logo.svg';
import { FaUser, FaLock } from 'react-icons/fa';

export const Login = () => {
    useCheckUser();
    /**
     * States
     */
    const {
        email,
        password,
        loading,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
    } = useLogin();

    const { isAuthenticated } = useAuthContext();

    return (
        <main className="main__login">
            {
                isAuthenticated && <Navigate to="/" />
            }
            <div className="login__logo-container">
                <img src={logo} className="login__logo" alt="Logo ReservaNOW" />
            </div>
            <form className="login__login-form">
                <h1 className="login__title">Login</h1>
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
                        Username must be larger than 3 characters
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
                <button
                    className="login__login-form__submit-btn"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Login
                </button>
                <div className="login__login-form__signup">
                    {"Don't have an account?"} <Link to="/signup">Signup</Link>
                </div>
            </form>
        </main>
    );
};
