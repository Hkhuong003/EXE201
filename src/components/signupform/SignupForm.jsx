import React from "react";
import { FaApple, FaGoogle, FaFacebook } from "react-icons/fa";
import "./SignupForm.scss";

const SignupForm = () => {
  return (
    <div className="signup-form">
      <h2>SIGNUP</h2>
      <p>Welcome to Historical Tourism! <br />"See the World Through Historical Eyes!"</p>
      
      <input type="text" placeholder="Enter your user name..." />
      <input type="password" placeholder="Enter your password..." />
      <input type="password" placeholder="Confirm your password..." />
      
      <button className="signup-button">Signup</button>
      
      <div className="social-signup">
        <p>Or signup with</p>
        <div className="icons">
          <button className="google"><FaGoogle /></button>
          <button className="facebook"><FaFacebook /></button>
          <button className="apple"><FaApple /></button>
        </div>
      </div>

      <p className="terms">
        By registering an account, you agree to the <a href="#">terms of use</a> and <a href="#">community rules</a>.
      </p>
      <p>Already have an account? <a href="#">Login</a></p>
    </div>
  );
};

export default SignupForm;
