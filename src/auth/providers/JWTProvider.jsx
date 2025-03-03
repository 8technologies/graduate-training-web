import axios from "axios";
import { createContext, useState, useEffect } from "react";
import * as authHelper from "../_helpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
export const LOGIN_URL = `${API_URL}/login`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const GET_USER_URL = `${API_URL}/user`;

// Leave the user object as returned without transforming fields.
const transformUser = (user) => user;

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log("DEBUG: Auth state on mount ->", auth);
    verify();
  }, []);

  const saveAuth = (authData) => {
    if (authData?.token) {
      setAuth(authData);
      authHelper.setAuth(authData);
      axios.defaults.headers.Authorization = `Bearer ${authData.token}`;
    } else {
      setAuth(null);
      authHelper.removeAuth();
      delete axios.defaults.headers.Authorization;
    }
  };

  const login = async (email, password) => {
    try {
        const response = await axios.post(LOGIN_URL, { email, password });

        if (!response.data || !response.data.token || !response.data.user) {
            throw new Error("Invalid login credentials");
        }

        saveAuth(response.data);
        setCurrentUser(response.data.user);

        return response.data; // ✅ Fix return
    } catch (error) {
        console.error("Login failed:", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Login failed");
    }
};


  const getUser = async () => {
    try {
      const { data } = await axios.get(GET_USER_URL);
      console.log("DEBUG: User fetched ->", data);
      const transformedUser = transformUser(data);
      setCurrentUser(transformedUser);
      return transformedUser;
    } catch (error) {
      saveAuth(null);
      setCurrentUser(null);
      console.error("DEBUG: Failed to fetch user ->", error);
      throw new Error("Failed to fetch user details");
    }
  };

  const verify = async () => {
    if (auth?.token) {
      try {
        const user = await getUser();
        // No enforcement for students—fields remain as returned.
        setCurrentUser(user);
      } catch (error) {
        console.error("DEBUG: User verification failed ->", error);
        saveAuth(null);
        setCurrentUser(null);
        window.location.href = '/metronic/tailwind/react/auth';
      }
    }
    setLoading(false);
  };

  const logout = async () => {
    try {
      await axios.post(LOGOUT_URL);
    } catch (error) {
      console.error("Logout failed:", error);
    }
    saveAuth(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ loading, setLoading, auth, currentUser, login, getUser, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
