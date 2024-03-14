import { Navigate } from "react-router-dom";

import { useState } from "react";
import { useAuth } from "../../../hooks/UseAuth";

import "../Auth.scss";
import { iconStyles } from "../../../styles/iconStyles";
import logo from "../../../assets/logo/reservanow_logo.svg";
import { FaUser, FaLock } from "react-icons/fa";

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    onLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  const isValidName = username.length > 3;
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <main className="main__login">
      <img src={logo} className="login__logo" alt="Logo ReservaNOW" />
      <form onSubmit={hadleSubmit} className="login__login-form">
        <h1 className="login__title">Login</h1>
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
            <FaUser style={iconStyles} />
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
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
          />
          <div className="login__login-form__icon">
            <FaLock style={iconStyles} />
          </div>
        </div>
        {!isValidPassword(password) && password ? (
          <div className="login__login-form__error">
            At least 8 characters, 1 number, 1 uppercase, 1 lowercase
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
          {"Don't have an account?"} <a href="/register">Sign up</a>
        </div>
      </form>
    </main>
  );
};
