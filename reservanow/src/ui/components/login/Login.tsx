import "./Login.scss";
import logo from "../../../assets/logo/reservanow_logo.svg";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const hadleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="main__login">
      <img src={logo} className="login__logo" alt="Logo ReservaNOW" />
      <form onSubmit={hadleSubmit} className="login__login-form">
        <h1 className="login__title">Login</h1>
        <div className="form__input">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            value={username}
          />
          <FaUser className="form__input-icon" />
        </div>
        <div className="form__input">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
          />
          <FaLock className="form__input-icon" />
        </div>
        <div className="form__remember-forgot">
          <label htmlFor="remember">
            <input type="checkbox" name="remember" id="remember" />
            <a href="#">Forgot password?</a>
          </label>
        </div>
        <button type="submit">Login</button>
        <div className="form__signup">
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </form>
    </main>
  );
};
