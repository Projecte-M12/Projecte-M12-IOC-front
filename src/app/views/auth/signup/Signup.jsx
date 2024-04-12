import { Navigate } from 'react-router-dom';

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

import '../Auth.scss';
import { iconStyleDefault, iconStyleGreen } from '../../../styles/iconStyles';
import logo from '../../../assets/logo/reservanow_logo.svg';
import { FaUser, FaLock } from 'react-icons/fa';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [prePassword, setPrePassword] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  if (auth.isAuthenticated) {
    if (auth.isCustomer) {
      return <Navigate to="/customer-dashboard" />;
    } else {
      return <Navigate to="/company-dashboard" />;
    }
  }

  const hadleSubmit = (e) => {
    e.preventDefault();
    confimedLogin();
  };

  const confimedLogin = async () => {
    const response = await fetch('http://reservanow-api2.cat', {});
    response.json().then((data) => {
      console.log(data);
    });
  };

  //**********************************************************************
  // Live validations
  //**********************************************************************
  const isValidName = username.length > 3;
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };
  const isSamePassword = (confirmedPassword) => {
    if (prePassword === confirmedPassword) {
      setPassword(confirmedPassword);
    } else {
      setPassword('');
    }
  };
  //************************************************************************

  return (
    <main className="main__login">
      <div className="login-logo">
        <img src={logo} className="login__logo" alt="Logo ReservaNOW" />
      </div>
      <form onSubmit={hadleSubmit} className="login__login-form">
        <h1 className="login__title">Signup</h1>
        <div className="login__login-form__input-box">
          <input
            type="text"
            className="login__login-form__input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            value={username}
          />
          <div className="login__login-form__icon">
            <FaUser style={iconStyleDefault} />
          </div>
        </div>
        {!isValidName && username ? (
          <div className="login__login-form__error">
            Username must be larger than 3 characters
          </div>
        ) : null}
        <div className="login__login-form__input-box">
          <input
            type="password"
            className="login__login-form__input"
            placeholder="Password"
            onChange={(e) => setPrePassword(e.target.value)}
            required
            value={prePassword}
          />
          <div className="login__login-form__icon">
            <FaLock style={iconStyleDefault} />
          </div>
        </div>
        {!isValidPassword(prePassword) && prePassword ? (
          <div className="login__login-form__error">
            At least: 8 characters - One number - One uppercase - One lowercase
          </div>
        ) : null}
        <div className="login__login-form__input-box">
          <input
            type="password"
            className="login__login-form__input"
            placeholder="Confirm your password"
            onChange={(e) => isSamePassword(e.target.value)}
            required
            // value={password}
          />
          <div className="login__login-form__icon">
            <FaLock
              style={
                password && password === prePassword
                  ? iconStyleGreen
                  : iconStyleDefault
              }
            />
          </div>
        </div>
        <button className="login__login-form__submit-btn" type="submit">
          Signup
        </button>
        <div className="login__login-form__signup">
          {'Already have an account?'} <a href="/login">Login</a>
        </div>
      </form>
    </main>
  );
};
