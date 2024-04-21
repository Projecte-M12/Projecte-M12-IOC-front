import { Navigate } from 'react-router-dom';

import { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

// Components propis
import { Input } from '../../../shared/components/Input/Input.jsx';
import { Button } from '../../../shared/components/Button/Button.jsx';

//import '../Auth.scss';
import './Signup.css';


import { iconStyleDefault, iconStyleGreen } from '../../../styles/iconStyles';
import logo from '../../../assets/logo/reservanow_logo.svg';
import { FaUser, FaLock } from 'react-icons/fa';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [prePassword, setPrePassword] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuthContext();

  if (auth.isAuthenticated) {
    if (auth.isCustomer) {
      return <Navigate to="/customer-dashboard" />;
    } else {
      return <Navigate to="/company-dashboard" />;
    }
  }

  const hadleSubmit = (e) => {
    e.preventDefault();
    confimedsignup();
  };

  const confimedsignup = async () => {
    const response = await fetch('http://reservanow-api2.cat', {});
    response.json().then((data) => {
      console.log(data);
    });
  };

  //**********************************************************************
  // Live validations
  //**********************************************************************
  //
  const isValidName = username.length > 3;
  // 
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };
  //
  const isSamePassword = (confirmedPassword) => {
    if (prePassword === confirmedPassword) {
      setPassword(confirmedPassword);
    } else {
      setPassword('');
    }
  };
  //************************************************************************

  return (
    <>
      <main className="signup__container">
        <div className="signup-logo">
          <img src={logo} className="signup__logo" alt="Logo ReservaNOW" />
        </div>
        <form onSubmit={hadleSubmit} className="signup__signup-form">
          <h1 className="signup__title">Registra't</h1>
          <div className="signup__form--input-box">
            <Input
              type="email"
              placeholder="Correu"
              onChange={(value) => setUsername(value)}
              required
              value={username}
            />
            <div className="signup__form__icon">
              <FaUser style={iconStyleDefault} />
            </div>
          </div>
          {!isValidName && username ? (
            <div className="signup__form__error">
              Username must be larger than 3 characters
            </div>
          ) : null}
          <div className="signup__form__input-box">
          <Input
              type="password"
              placeholder="Contrassenya"
              onChange={(value) => setPassword(value)}
              required
              value={password}
            />
            <div className="signup__form__icon">
              <FaLock style={iconStyleDefault} />
            </div>
          </div>
          {!isValidPassword(prePassword) && prePassword ? (
            <div className="signup__form__error">
              At least: 8 characters - One number - One uppercase - One lowercase
            </div>
          ) : null}
          <div className="signup__form__input-box">
            <input
              type="password"
              className="signup__sform__input"
              placeholder="Confirm your password"
              onChange={(e) => isSamePassword(e.target.value)}
              required
            // value={password}
            />
            <div className="signup__signup-form__icon">
              <FaLock
                style={
                  password && password === prePassword
                    ? iconStyleGreen
                    : iconStyleDefault
                }
              />
            </div>
          </div>
          <Button
            text="Sign Up"
            url={"/Login"}
            isLink={true}
            // TODO Cridar al component d'animació check en cas que el registre sigui OK
            className='primary-button'
          />
          <div className="signup__signup-form__signup">
            {'Tens una compte?'} <a href="/Login">Inicia sessió</a>
          </div>
        </form>
      </main>
    </>
  );
};
