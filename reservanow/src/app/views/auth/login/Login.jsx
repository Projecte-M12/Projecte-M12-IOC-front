import "../Auth.scss";
import { iconStyles } from "../../../styles/iconStyles";
import logo from "../../../assets/logo/reservanow_logo.svg";
import { FaUser, FaLock } from "react-icons/fa";

import { useState } from "react";

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const hadleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
    setUsername("");
    setPassword("");
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
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
          />
          <div className="login__login-form__icon">
            <FaLock style={iconStyles} />
          </div>
        </div>
        <div className="login__login-form__remember-forgot">
          <label htmlFor="remember">
            <input type="checkbox" name="remember" id="remember" />
            <a href="#">Forgot password?</a>
          </label>
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
