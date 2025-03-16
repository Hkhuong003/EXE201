import React from "react";
import "./LoginForm.scss";
import { FaApple, FaGoogle, FaFacebook } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>LOGIN</h2>
        <p>Welcome to Historical Tourism!<br />"See the World Through Historical Eyes!"</p>

        <label>User Name</label>
        <input type="text" placeholder="Enter your user name.." />

        <label>Password</label>
        <input type="password" placeholder="Enter your password.." />

        <button className="login-button">Login</button>

        <div className="social-login">
          <p>Or login with</p>
          <div className="icons">
            <button className="apple"><FaApple /></button>
            <button className="google"><FaGoogle /></button>
            <button className="facebook"><FaFacebook /></button>
          </div>
        </div>

        <p className="terms">
          Don't have an account? <a href="#">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
