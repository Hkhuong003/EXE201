import React, { createContext, useContext, useState } from "react";

// Tạo context cho việc quản lý trạng thái người dùng
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Trạng thái người dùng: null, admin, user

  // Hàm login giả
  const login = (username, password) => {
    if (username === "admin" && password === "adminpassword") {
      setUser({ username: "admin", role: "admin" });
    } else if (username === "user" && password === "userpassword") {
      setUser({ username: "user", role: "user" });
    } else {
      alert("Thông tin đăng nhập không chính xác");
    }
  };

  // Hàm logout
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
