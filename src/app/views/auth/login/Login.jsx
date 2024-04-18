// Llibreries
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

// Components propis
import { Input } from '../../../shared/components/Input/input.jsx';
import { Button } from '../../../shared/components/Button/Button.jsx';
import { InvertedButton } from '../../../shared/components/InvertedButton/InvertedButton.jsx';

// Estils CSS
import '../login/Login.css';

// Imatges i icons
import { iconStyleDefault } from '../../../styles/iconStyles';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from '../../../assets/logo/reservanow_logo.svg';
import eyeOpen from '../../../assets/icons/eyeopen.svg';
import eyeCrossed from '../../../assets/icons/eyecrossed.svg';


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

    const handleSubmit = (e) => {
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
        <>
            <main className="login-container">
                {/* Referir al CSS aquí */}
                <div className="login__logo-container">
                    <img src={logo} className="login__logo" alt="Logo ReservaNOW" />
                </div>
                <form onSubmit={handleSubmit} className="login__form">
                    <h1 className="login__title">Hola de nou ;)</h1>
                    <div className="login__input-box">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(value) => setEmail(value)}
                        />
                        <div className="login__icon">
                            <FaUser style={iconStyleDefault} />
                        </div>
                    </div>
                    {!isValidName && email ? (
                        <div className="login__error">
                            L'email ha de tenir més de 3 caràcters
                        </div>
                    ) : null}
                    <div className="login__input-box">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            onChange={(value) => setPassword(value)}
                            required
                            value={password}
                        />
                        {/* Per defecte s'oculta la contrasenya */}
                        <button
                            type="button"
                            className='login__password-toggle'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <img src={eyeOpen} alt="Oculta contrasenya" />
                            ) : (
                                <img src={eyeCrossed} alt="Mostra contrasenya" />
                            )}
                        </button>
                        <div className="login__icon">
                            <FaLock style={iconStyleDefault} />
                        </div>
                    </div>
                    {!isValidPassword(password) && password ? (
                        <div className="login__error">
                            La contrasenya ha de tenir com a mínim 8 caràcters, 1 número, 1 majúscula i 1 minúscula
                        </div>
                    ) : null}
                    <div className="login__remember">
                        <label htmlFor="remember">
                            <input type="checkbox" name="remember" id="remember" />
                        </label>
                        <p>Recorda'm</p>
                    </div>
                    <div>
                        <a href="#">Has oblidat la contrasenya?</a>
                    </div>
                    <button className="login__submit-btn" type="submit">
                        Login
                    </button>
                    <div className="login__signup">
                        {"Encara no tens un compte?"} <a href="/signup">Registra't</a>
                    </div>
                </form>
            </main>
        </>
    );
};
