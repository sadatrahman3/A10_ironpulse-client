import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { localStorage.removeItem("user"); }
    }

    if (!saved) {
      setLoading(false);
      return;
    }

    api.get("/auth/me")
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch(() => {
        // Keep the cached user from localStorage instead of logging out.
        // The 401 interceptor handles real auth failures on actual API calls.
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  };

  const register = async (name, email, password, image) => {
    const { data } = await api.post("/auth/register", { name, email, password, image });
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    localStorage.removeItem("user");
  };

  const refreshUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user;
    } catch {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
