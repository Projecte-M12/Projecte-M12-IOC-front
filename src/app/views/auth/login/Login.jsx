/**
 * React
 */
import React, { useState } from 'react';
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

// Components propis
import { Input } from '../../../shared/components/Input/Input.jsx';
import { Button } from '../../../shared/components/Button/Button.jsx';
import { InvertedButton } from '../../../shared/components/InvertedButton/InvertedButton.jsx';

// Estils CSS
import '../Login/Login.css';

// Imatges i icons
import { iconStyleDefault } from '../../../styles/iconStyles';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from '../../../assets/logo/reservanow_logo.svg';
import eyeOpen from '../../../assets/icons/eyeopen.svg';
import eyeCrossed from '../../../assets/icons/eyecrossed.svg';


/**
 * Componente Login
 */
export const Login = () => {
    /**
     * Custom Hooks
     */
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

    // Oculta o mostra la contrassenya
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Return
     */
    return (
        <>
            <main className="login__container">
                {isAuthenticated && <Navigate to="/" />}
                {/* Referir al CSS aquí */}
                <div className="logo-container">
                    <img src={logo} className="login__logo" alt="Logo ReservaNOW" />
                </div>
                <form onSubmit={handleSubmit} className="login__form-container">
                    <h1 className="login__form-title">Hola de nou ;)</h1>
                    <div className="login__form--input-box">
                        <h3>Inicia sessió</h3>
                        <Input
                            type="email"
                            placeholder="Correu"
                            // TODO Falta onChange del email
                            onChange={(value) => handleEmailChange(value)}
                            value={email}
                        // onChange={(value) => setEmail(value)}
                        />
                        <div className="login__icon">
                            <FaUser style={iconStyleDefault} />
                        </div>
                    </div>
                    {!isValidEmail && email ? (
                        <div className="login__form-error">
                            L'email ha de tenir més de 3 caràcters
                        </div>
                    ) : null}
                    <div className="login__form--input-box">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            onChange={(value) => handlePasswordChange(value)}
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
                        <div className="login__form-error">
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
                    {/* TODO: Afegir la lògica per al enviament de les credencials */}
                    <Button
                        text="Log In"
                        url={"/Login"}
                        isLink={true}
                        className='primary-button'
                    />
                    <div className="login__signup">
                        {"Encara no tens un compte?"} <a href="/Signup" className='text-accent'>Registra't</a>
                    </div>
                </form>
            </main>
        </>
    );
};
