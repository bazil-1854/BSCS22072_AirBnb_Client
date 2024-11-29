import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const isValid = validateToken(token);
      if (isValid) {
        fetchUserData(token);
      } else {
        localStorage.removeItem("token");
        setUser(null);
        setUserRole(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/user-info`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
      setUserRole(response.data.role);
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
      setUser(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
