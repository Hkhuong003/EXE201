import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/signup/SignUp.scss";
import logo from "../../assets/logo.png";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Logic xử lý signup (gọi API, v.v.)
    navigate("/login"); // Điều hướng về trang login sau khi signup
  };

  return (
    <div className="signup-container">
      <div className="logo">
        <img src={logo} alt="Dalat Tourism Logo" />
      </div>
      <div className="signup-form">
        <form onSubmit={handleSignup}>
          <h1>SIGNUP</h1>
          <p>Welcome to Historical Tourism! <br /> "See the World Through Historical Eyes!"</p>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your user name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Signup</button>
          <div className="terms">
            By registering an account, you agree to the <a href="#">terms of use</a> and <a href="#">community rules</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;