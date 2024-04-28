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

/**
 * Serveis
 */
import { getServices } from '../../../services/getServices';

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
import { Header } from '../../../shared/components/Header/Header.jsx';
import { getCompanies } from '../../../services/getCompanies.js';

export const Signup = () => {
    /*
     * ----- States
     */
    // const [confirmedPassword, setConfirmedPrePassword] = useState('');
    const { isAuthenticated, user } = useAuthContext();

    // Oculta o mostra la contrassenya
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [servicesList, setServicesList] = useState([]);
    // const [providers, setProviders] = useState([]);

    // Hay que crear un useSignup con su propio estado
    const {
        email,
        password,
        name,
        passwordConfirmation,
        isCompany,
        services,
        image_url,
        remember,
        signedUp,
        loading,
        message,
        error,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleNameChange,
        handleIsCompanyChange,
        handleServicesChange,
        handleImageUrlChange,
        handleSubmit,
    } = useSignup();

    /*
     * ----- Custom Hooks
     */
    const { checkToken } = useCheckUser();
    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // setProviders(await getCompanies());
            setServicesList(await getServices());
        };
        fetchData();
        console.log('Services', services);
    }, []);

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
        <>
            <Header />
            <main className="signup__container">
                <div className="signup__logo-container">
                    <img
                        src={logo}
                        className="signup__logo"
                        alt="Logo ReservaNOW"
                    />
                </div>
                <h1 className="singup__form-tittle">Welcome!</h1>
                <form className="signup__form-container">
                    <h3>Registra't</h3>
                    <div className="signup__form--input-box">
                        <div className="signup__form-icon">
                            <FaUser style={iconStyleDefault} />
                        </div>
                        <Input
                            type="email"
                            placeholder="Correu"
                            onChange={handleEmailChange}
                            value={email}
                            required
                        />
                    </div>
                    {!isValidEmail && email ? (
                        <div className="signup__form-error">
                            {"L'email no és correcte"}
                        </div>
                    ) : null}
                    <div className="signup__form--input-box">
                        <div className="signup__form-icon">
                            <FaLock style={iconStyleDefault} />
                        </div>
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
                            className="signup__password-toggle"
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
                        <div className="signup__form-error">
                            La contrasenya ha de tenir com a mínim 8 caràcters,
                            1 número, 1 majúscula i 1 minúscula
                        </div>
                    ) : null}
                    <div className="signup__form--input-box">
                        <div className="signup__form-icon">
                            <FaLock
                                style={
                                    password &&
                                    password === passwordConfirmation
                                        ? iconStyleGreen
                                        : password
                                          ? iconStyleRed
                                          : iconStyleDefault
                                }
                            />
                        </div>
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
                            className="signup__confirm--password-toggle"
                            onClick={() =>
                                setShowConfirmation(!showConfirmation)
                            }
                        >
                            {showConfirmation ? (
                                <img src={eyeOpen} alt="Oculta contrasenya" />
                            ) : (
                                <img
                                    src={eyeCrossed}
                                    alt="Mostra contrasenya"
                                />
                            )}
                        </button>
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
                                    onChange={handleServicesChange}
                                >
                                    <option value="" disabled selected>
                                        Selecciona una categoria...
                                    </option>
                                    {servicesList &&
                                        servicesList.map((service, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={service}
                                                >
                                                    {service}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="signup__form--input-box">
                                <Input
                                    type="text"
                                    name="Empresa"
                                    placeholder="Nom Empresa"
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className="signup__form--input-box">
                                <Input
                                    type="text"
                                    name="ImageUrl"
                                    placeholder="ImageUrl"
                                    onChange={handleImageUrlChange}
                                />
                            </div>
                        </>
                    )}
                    <Button
                        // type="submit"
                        text="Sign Up"
                        action={handleSubmit}
                        disabled={
                            !isValidEmail(email) ||
                            !isValidPassword(password) ||
                            !passwordConfirmation ||
                            password !== passwordConfirmation
                        }
                    />
                    <div className="redirect_login">
                        Ja tens un compte? <Link to="/login">Login</Link>
                    </div>
                </form>
                {/* TODO: Donar estil al missatge d'error */}
                {message && <div className="">{message}</div>}
            </main>
        </>
    );
};
