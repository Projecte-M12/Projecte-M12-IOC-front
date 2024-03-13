import "../Auth.scss";
import { iconStyles } from "../../../styles/iconStyles";
import logo from "../../../assets/logo/reservanow_logo.svg";
import { FaUser, FaLock } from "react-icons/fa";

import { useState } from "react";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const hadleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="main__login">
      <img src={logo} className="login__logo" alt="Logo ReservaNOW" />
      <form onSubmit={hadleSubmit} className="login__login-form">
        <h1 className="login__title">Signup</h1>
        <div className="login__login-form__input-box">
          <input
            type="text"
            className="login__login-form__input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <img src={FaUser} alt="" />
          <div className="login__login-form__icon">
            <FaUser style={iconStyles} />
          </div>
        </div>
        <div className="login__login-form__input-box">
          <input
            type="password"
            className="login__login-form__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login__login-form__icon">
            <FaLock style={iconStyles} />
          </div>
        </div>
        <div className="login__login-form__input-box">
          <input
            type="password"
            className="login__login-form__input"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="login__login-form__icon">
            <FaLock style={iconStyles} />
          </div>
        </div>
        <button className="login__login-form__submit-btn" type="submit">
          Login
        </button>
        <div className="login__login-form__login">
          {"Do you already have an account?"} <a href="/login">Login</a>
        </div>
      </form>
    </main>
  );
};
