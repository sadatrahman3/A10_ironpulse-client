import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleForceLogout = () => setUser(null);
    window.addEventListener("auth:logout", handleForceLogout);
    return () => window.removeEventListener("auth:logout", handleForceLogout);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (saved && token) {
      try { setUser(JSON.parse(saved)); } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else if (saved && !token) {
      localStorage.removeItem("user");
      setLoading(false);
      return;
    }

    if (!saved || !token) {
      setLoading(false);
      return;
    }

    api.get("/auth/me")
      .then(({ data }) => {
        if (data.token) localStorage.setItem("token", data.token);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  };

  const register = async (name, email, password, image) => {
    const { data } = await api.post("/auth/register", { name, email, password, image });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const refreshUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user;
    } catch {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
