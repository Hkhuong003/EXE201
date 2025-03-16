import React, { useState } from "react";
import LoginForm from "../../components/loginform/LoginForm";
import image from '../../assets/logo.png';
import { useAuth } from "../../contexts/AuthContext"; // Import context để truy cập vào auth
import { useNavigate } from "react-router-dom";  // Dùng useNavigate để điều hướng sau khi đăng nhập
import "./LoginPage.scss";

const LoginPage = () => {
  const { login } = useAuth();  // Sử dụng hook từ context để thực hiện đăng nhập
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    
    // Kiểm tra đăng nhập từ context
    login(username, password);
    
    // Sau khi đăng nhập thành công, điều hướng tới trang chủ hoặc admin page tùy theo quyền
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={image} alt="DALAT Tourism" />
      </div>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your username" 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
