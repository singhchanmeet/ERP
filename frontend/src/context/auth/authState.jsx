import axios from "axios";
import AuthContext from "./authContext";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
  // Use destructuring to extract navigate from the useNavigate hook
  const navigate = useNavigate();

  const host = "https://admin.erp.mait.ac.in";

  // Use useState initializers to fetch tokens from localStorage
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refreshToken") || null);

  // Function to handle the login process
  const handleLogin = () => {
    const microsoftLoginUrl = `${host}/auth/sign_in`;
    window.location.href = microsoftLoginUrl;
  };



  // Function to handle user logout
  const logoutUser = useCallback(() => {
    const microsoftLogoutUrl = `${host}/auth/sign_out`;
    window.location.href = microsoftLogoutUrl;
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }, [navigate]);

  // Context value to be provided to the components
  const contextValue = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    handleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {/* Render the child components when loading is false */}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
