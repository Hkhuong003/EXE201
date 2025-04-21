import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import logo from "../../assets/logo2.png";

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userData = await login(username, password); // Gọi login và nhận userData
      if (userData && userData.userId) {
        localStorage.setItem("accountId", userData.userId); // Lưu userId dưới tên accountId
        setError(null);
        navigate("/"); // Điều hướng về trang chủ
      } else {
        throw new Error("Không nhận được userId từ phản hồi.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
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
          {error && <p className="error-message">{error}</p>}
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