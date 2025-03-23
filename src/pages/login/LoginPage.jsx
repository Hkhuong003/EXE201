import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import logo from "../../assets/logo.png";

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Gọi hàm login từ AuthContext để xử lý đăng nhập
      await login(username, password);
      // Nếu đăng nhập thành công, lưu token vào localStorage (nếu cần)
      localStorage.setItem("token", "1");
      // Điều hướng về trang chủ
      navigate("/");
    } catch (error) {
      // Xử lý lỗi đăng nhập (có thể hiển thị thông báo lỗi)
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src={logo} alt="Dalat Tourism Logo" />
      </div>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h1>LOGIN</h1>
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
          <button type="submit">Login</button>
          <div className="signup-link">
            Don't have an account? <a href="/sign-up">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;