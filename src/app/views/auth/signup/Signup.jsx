/** 
 *  React
 */
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

/** 
 *  Utils
 */
import { isValidEmail, isValidPassword } from '../../../utils/validations';

/** 
 *  Components propis
 */
import { Header } from '../../../shared/components/Header/Header.jsx';
import { Input } from '../../../shared/components/Input/Input.jsx';
import { Button } from '../../../shared/components/Button/Button.jsx';
import { Footer } from '../../../shared/components/Footer/Footer.jsx';
import { CheckAnimation } from '../../../shared/components/CheckAnimation/CheckAnimation.jsx';

/**
 * Custom hooks
 */
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCheckUser } from '../../../hooks/useCheckUser';
import { useSignup } from '../../../hooks/useSignUp';

/**
 * Serveis
 */
import { getServices } from '../../../services/getServices';
import { getCompanies } from '../../../services/getCompanies.js';

/** 
 *  Styles
 */
import './Signup.css';
import {
    iconStyleDefault,
    iconStyleGreen,
    iconStyleRed,
} from '../../../styles/iconStyles';

/** 
* Icons & Images
*/
import logo from '../../../assets/logo/reservanow_logo.svg';
import eyeOpen from '../../../assets/icons/eyeopen.svg';
import eyeCrossed from '../../../assets/icons/eyecrossed.svg';
import mailLetter from '../../../assets/icons/mail.svg';
import shopIcon from '../../../assets/icons/shop.svg';
import profile from '../../../assets/icons/profile.svg';
import passwordKey from '../../../assets/icons/keyAccount.svg';
import passwordKeyOK from '../../../assets/icons/keyAccountOK.svg';
import passwordKeyBad from '../../../assets/icons/keyAccountBad.svg';
import profilePicture from '../../../assets/icons/picture-jpg.svg';
import profileIcon from '../../../assets/icons/user.svg';

/** 
 * Component Signup
 * @returns {JSX.Element} Component de registre
 */
export const Signup = () => {
    /** 
     * States
     */
    const { isAuthenticated, user } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [servicesList, setServicesList] = useState([]);
    const [navigateToLogin, setNavigateToLogin] = useState(false);
    const {
        email,
        password,
        name,
        passwordConfirmation,
        isCompany,
        services,
        companyName,
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
        handleCompanyNameChange,
        handleImageUrlChange,
        handleSubmit,
    } = useSignup();

    /** 
     * Custom Hooks
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
    }, []);
    
    useEffect(() => {
        let timeoutId;
        if (signedUp) {
            timeoutId = setTimeout(() => {
                setNavigateToLogin(true);
            }, 3000);
        }

        return () => clearTimeout(timeoutId);
    }, [signedUp]);

    /** 
     * Comprobació usuari loguejat i redirecció
     */
    if (isAuthenticated) {
        if (user && user.company_name) {
            return <Navigate to="/company-dashboard" replace />;
        } else {
            return <Navigate to="/customer-dashboard" replace />;
        }
    }

    /**
    * Renderitza el formulari de registr i la confirmació de registr exitós.
    * @returns {JSX.Element} El formulari de registre en cas de nou usuari i la confirmació de registre satisfactori.
    */
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

                {/**
                * Condicional del formulari.
                * Mostra el formulari de registra i sino està registrat "signedUp=false" llavors
                * mostra l'animació de registre correctament
                */}
                {signedUp ? (
                    <>
                        <CheckAnimation />
                        <div className="signup__formSuccess">
                            REGISTRAT CORRECTAMENT
                        </div>
                        {navigateToLogin && <Navigate to="/login" replace />}
                    </>
                ) : (
                    <form className="signup__form-container">
                        <h2>Registra't</h2>
                        <div className="signup__form--input-box">
                            <div className="signup__form-icon">
                                <img src={profileIcon} alt="profile" />
                            </div>
                            <Input
                                type="text"
                                placeholder="Nom d'usuari"
                                onChange={handleNameChange}
                                value={name}
                                required
                            />
                        </div>
                        <div className="signup__form--input-box">
                            <div className="signup__form-icon">
                                <img src={mailLetter} alt="email" />
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
                                <img src={passwordKey} alt="password" />
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
                                <img src={password && password === passwordConfirmation ? passwordKeyOK : password ? passwordKeyBad : passwordKey} alt="password" />
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
                                className="signup__empresaCheckbox"
                            />
                            <label htmlFor="is_company">Soc una empresa</label>
                        </div>
                        {isCompany && (
                            <>
                                <div className="signup__form--input-box">
                                    <select
                                        name="servicio"
                                        className="signup__select"
                                        defaultValue={''}
                                        onChange={handleServicesChange}
                                    >
                                        <option value="" disabled>
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
                                    <div className="signup__form-icon">
                                        <img src={shopIcon} alt="shop icon" style={iconStyleDefault} />
                                    </div>
                                    <Input
                                        type="text"
                                        placeholder="Nom Empresa"
                                        onChange={handleCompanyNameChange}
                                        value={companyName}
                                        required
                                    />
                                </div>
                                <div className="signup__form--input-box">
                                    <div className="signup__form-icon">
                                        <img src={profilePicture} alt="profile picture" style={iconStyleDefault} />
                                    </div>
                                    <Input
                                        type="text"
                                        placeholder="ImageUrl"
                                        onChange={handleImageUrlChange}
                                        value={image_url}
                                        required
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
                )}
                {/* TODO: Donar estil al missatge d'error */}
                {message && <div className="">{message}</div>}
            </main >

            {/* Contingut del Footer */}
            <Footer />
        </>
    );
};
