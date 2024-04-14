// Llibreries
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

// Components propis
import { Input } from '../../../shared/components/Input/Input.jsx';
import { Button } from '../../../shared/components/Button/Button.jsx';
import { InvertedButton } from '../../../shared/components/InvertedButton/InvertedButton.jsx';

// Estils CSS
import '../login/Login.css';

// Imatges i icons
import { iconStyleDefault } from '../../../styles/iconStyles';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from '../../../assets/logo/reservanow_logo.svg';
import { eyeopen } from '../../../assets/icons/eyeopen.svg';
import { eyecrossed } from '../../../assets/icons/eyecrossed.svg';


// import { constants } from '../../../shared/constants';

export const Login = () => {
    const auth = useAuth();
    if (auth.isAunthenticated) {
        <Navigate to="/customer-dashboard" />;
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Oculta o mostra la contrassenya
    const [showPassword, setShowPassword] = useState(false);

    const hadleSubmit = (e) => {
        e.preventDefault();
        // console.log(auth);
        auth.signin(email, password);
    };

    //**********************************************************************
    // Live validations
    //**********************************************************************
    const isValidName = email.length > 3;
    const isValidPassword = (password) => {
        const passwordRegex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
    };
    //************************************************************************

    return (
        <main className="main__container-login">
            <div className="login__logo-container">
                <img src={logo} className="login__logo" alt="Logo ReservaNOW" />
            </div>
            <form onSubmit={hadleSubmit} className="login__login-form">
                <h1 className="login__title">Hola de nou ;)</h1>
                <div className="login__login-form__input-box">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(value) => setEmail(value)}
                    />
                    <div className="login__login-form__icon">
                        <FaUser style={iconStyleDefault} />
                    </div>
                </div>
                {!isValidName && email ? (
                    <div className="login__login-form__error">
                        Username must be larger than 3 characters
                    </div>
                ) : null}
                <div className="login__login-form__input-box">
                    <Input
                        type="password"
                        placeholder="Password"
                        onChange={(value) => setPassword(value)}
                        required
                        value={password}
                    />
                    {/* Per defecte s'oculta la contrassenya */}
                    <button
                        type="button"
                        className='password__toggle'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <img src={eyeCrossed} class='password__toggle--icon' alt="hide password" />
                        ) : (
                            <img src={eyeOpen} class='password__toggle--icon' alt="show password" />
                        )}
                    </button>
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
