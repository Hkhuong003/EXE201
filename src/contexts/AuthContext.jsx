import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo AuthContext
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Quản lý trạng thái người dùng

  // Khôi phục trạng thái đăng nhập từ localStorage khi component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Giả lập khôi phục thông tin user, bạn có thể thay bằng API để lấy thông tin user
      setUser({ username: "user", role: "user" }); // Cần thay bằng dữ liệu thực từ API
    }
  }, []);

  // Hàm login
  const login = async (username, password) => {
    try {
      // Giả lập kiểm tra đăng nhập, thay bằng API thực tế
      if (username === "admin" && password === "12345") {
        const userData = { username: "admin", role: "admin" };
        setUser(userData);
        localStorage.setItem("token", "1"); // Lưu token vào localStorage
        return userData;
      } else if (username === "user" && password === "12345") {
        const userData = { username: "user", role: "user" };
        setUser(userData);
        localStorage.setItem("token", "1"); // Lưu token vào localStorage
        return userData;
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      throw error; // Ném lỗi để component gọi login xử lý
    }
  };

  // Hàm logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};