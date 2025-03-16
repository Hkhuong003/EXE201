import React from "react";
import SignupForm from "../../components/signupform/SignupForm";
import image from '../../assets/logo.png';
// import "./Signup.scss";

const SignupPage = () => {
  return (
    <div className="signup-container">
      <div className="logo">
        <img src={image} alt="DALAT Tourism" />
      </div>
      <SignupForm/>
    </div>
  );
};

export default SignupPage;
