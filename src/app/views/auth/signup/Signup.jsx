/*
 * ----- React
 */
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

/*
 * ----- Utils
 */
import { isValidEmail, isValidPassword } from '../../../utils/validations';

/*
* ----- Components propis
*/
import { Input } from '../../../shared/components/Input/Input.jsx';
import { Button } from '../../../shared/components/Button/Button.jsx';

/*
 * ----- Custom hooks
 */
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCheckUser } from '../../../hooks/useCheckUser';

/*
 * ----- Styles
 */
import './Signup.css';
import {
    iconStyleDefault,
    iconStyleGreen,
    iconStyleRed,
} from '../../../styles/iconStyles';

import logo from '../../../assets/logo/reservanow_logo.svg';
import { FaUser, FaLock } from 'react-icons/fa';
import { useSignup } from '../../../hooks/useSignUp';

import eyeOpen from '../../../assets/icons/eyeopen.svg';
import eyeCrossed from '../../../assets/icons/eyecrossed.svg';

export const Signup = () => {
    /*
     * ----- Custom Hooks
     */
    const { checkToken } = useCheckUser();
    useEffect(() => {
        checkToken();
    }, []);

    /*
     * ----- States
     */
    // const [confirmedPassword, setConfirmedPrePassword] = useState('');
    const { isAuthenticated, user } = useAuthContext();

    // Oculta o mostra la contrassenya
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

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

    /*
     * ----- Funciones
     */
    if (signedUp) {
        setTimeout(() => {
            console.log('Registrat');
            return <Navigate to="/login" />;
        }, 2000);
    }

    /*
     * ----- Comprobación usuario logueado y redirección
     */
    if (isAuthenticated) {
        if (user && user.is_company) {
            return <Navigate to="/customer-dashboard" replace />;
        } else {
            return <Navigate to="/company-dashboard" replace />;
        }
    }

    return (
        <main className="signup__container">
            <div className="signup__logo-container">
                <img src={logo} className="signup__logo" alt="Logo ReservaNOW" />
            </div>
            <h1 className="singup__form-tittle">Welcome!</h1>
            <form className="signup__form-container">
                <h3>Registra't</h3>
                <div className="signup__form--input-box">
                    <Input
                        type="email"
                        placeholder="Correu"
                        onChange={handleEmailChange}
                        value={email}
                        required
                    />
                    <div className="signup__form-icon">
                        <FaUser style={iconStyleDefault} />
                    </div>
                </div>
                {!isValidEmail && email ? (
                    <div className="signup__form-error">
                        {"L'email no és correcte"}
                    </div>
                ) : null}
                <div className="signup__form--input-box">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Contrassenya"
                        onChange={handlePasswordChange}
                        required
                        value={password}
                    />
                    {/* Per defecte s'oculta la contrasenya */}
                    <button
                        type="button"
                        className='signup__password-toggle'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <img src={eyeOpen} alt="Oculta contrasenya" />
                        ) : (
                            <img src={eyeCrossed} alt="Mostra contrasenya" />
                        )}
                    </button>
                    <div className="signup__form-icon">
                        <FaLock style={iconStyleDefault} />
                    </div>
                </div>
                {!isValidPassword(password) && password ? (
                    <div className="signup__form-error">
                        La contrasenya ha de tenir com a mínim 8 caràcters, 1 número, 1 majúscula i 1 minúscula
                    </div>
                ) : null}
                <div className="signup__form--input-box">
                    <Input
                        type={showConfirmation ? 'text' : 'password'}
                        placeholder="Confirmar contrassenya"
                        onChange={handlePasswordConfirmationChange}
                        required
                        value={passwordConfirmation}
                    />
                    {/* Per defecte s'oculta la contrasenya */}
                    <button
                        type="button"
                        className='signup__confirm--password-toggle'
                        onClick={() => setShowConfirmation(!showConfirmation)}
                    >
                        {showConfirmation ? (
                            <img src={eyeOpen} alt="Oculta contrasenya" />
                        ) : (
                            <img src={eyeCrossed} alt="Mostra contrasenya" />
                        )}
                    </button>
                    <div className="signup__form-icon">
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

                <div className="signup__form--input-box">
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
                        <div className="signup__form--input-box">
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
                        <div className="signup__form--input-box">
                            <Input
                                type="text"
                                name="Empresa"
                                placeholder="Empresa"
                                onChange={handleNameChange}
                            />
                        </div>
                    </>
                )}
                <Button
                    // type="submit"
                    text="Sign Up"
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
                />
                <div className="redirect_login">
                    Ja tens un compte? <Link to="/Login">Login</Link>
                </div>
            </form>
            {/* TODO: Donar estil al missatge d'error */}
            {message && <div className="">{message}</div>}
        </main>
    );
};
