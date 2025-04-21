import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) verifyToken(token).catch(logout);
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch("https://exe201tourbook.azurewebsites.net/DecodeToken", {
        method: "GET",
        headers: {
          accept: "*/*",
          token: token,
        },
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid token");
      }

      console.log(">>>>> ", data.data);
      const userData = {
        username: data.data.username,
        role: data.data.role,
        userId: data.data.userId,
      };
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Error verifying token:", error.message);
      throw error;
    }
  };

  const login = async (username, password) => {
    const response = await fetch("https://exe201tourbook.azurewebsites.net/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log("Login response: ", data);
    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.data.token);
    const userData = await verifyToken(data.data.token);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("accountId");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};