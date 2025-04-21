import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../pages/signup/SignUp.scss";
import logo from "../../assets/logo2.png";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    // Kiểm tra dữ liệu trước khi gửi
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      setIsLoading(false);
      return;
    }

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ!");
      setIsLoading(false);
      return;
    }

    // Kiểm tra phone hợp lệ (ví dụ: 10 chữ số)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Số điện thoại không hợp lệ! Vui lòng nhập 10 chữ số.");
      setIsLoading(false);
      return;
    }

    // Tạo body cho API
    const signupData = {
      userName: username,
      email: email,
      phone: phone,
      password: password,
    };

    try {
      const response = await axios.post("https://exe201tourbook.azurewebsites.net/api/Accounts", signupData);

      if (response.data && response.data.message === "Account created successfully.") {
        alert("Đăng ký tài khoản thành công!");
        navigate("/login");
      } else {
        throw new Error("Đăng ký tài khoản thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký tài khoản:", error);
      setError(error.response?.data?.message || "Đăng ký tài khoản thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
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
          
          {error && <p className="error-message">{error}</p>}

          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your user name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter your phone number..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={isLoading}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Đang đăng ký..." : "Signup"}
          </button>

          <div className="terms">
            By registering an account, you agree to the <a href="#">terms of use</a> and <a href="#">community rules</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;