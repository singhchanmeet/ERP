import axios from "axios";
import AuthContext from "./authContext";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
  const navigate = useNavigate();

  const host = process.env.REACT_APP_BACKEND_URL;

  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refreshToken") || null);

  const handleLogin = () => {
    const microsoftLoginUrl = `${host}/auth/sign_in`;
    window.location.href = microsoftLoginUrl;
  };
  const logoutUser = useCallback(() => {
    const microsoftLogoutUrl = `${host}/auth/sign_out`;
    window.location.href = microsoftLogoutUrl;
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }, [navigate]);

  const updateTokens = useCallback(async () => {
    try {
      const response = await axios.post(`${host}/token/refresh/`, { refresh: refreshToken });
      const { access, refresh } = response.data;
      setAccessToken(access);
      setRefreshToken(refresh);
      localStorage.setItem("accessToken",access );
      localStorage.setItem("refreshToken", refresh);
    } catch (error) {
      const response = await axios.post(`${host}/token/refresh/`, { refresh: refreshToken });
      const { access, refresh } = response.data;
      setAccessToken(access);
      setRefreshToken(refresh);
      localStorage.setItem("accessToken",access );
      localStorage.setItem("refreshToken", refresh);
    }
  }, [refreshToken, logoutUser]);


  useEffect(() => {
    if (refreshToken) {
      const interval = setInterval(() => {
        updateTokens();
      }, 1000 *30); // Refresh every 4 minutes
      return () => clearInterval(interval);
    }
  }, [refreshToken, updateTokens]);

  const contextValue = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    handleLogin,
    logoutUser,
    updateTokens,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
