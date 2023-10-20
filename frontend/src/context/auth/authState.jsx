import AuthContext from "./authContext";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:8000";
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || null
    );
  const [refreshToken, setRefreshToken] = useState(
    () => localStorage.getItem("refreshToken") || null
    );
  const [loading, setLoading] = useState(false);
  let logoutUser = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  },[navigate])

  const updateToken = useCallback(async () => {
    let response = await fetch(`${host}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.status === 200) {
      let data = await response.json();
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  }, [loading,logoutUser,refreshToken])

  const handleLogin = () => {
    const microsoftLoginUrl = "http://localhost:8000/auth/sign_in";
    window.location.href = microsoftLoginUrl;
  };


  // const checkAccessToken = () => {
  //   if (!accessToken) {
  //     handleLogin();
  //   }
  // };

  
  const contextValue = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    handleLogin,
    logoutUser,
  };

  useEffect(() => {
    if (loading) {
        // checkAccessToken();
        updateToken();
    }

    let fourMinutes =  1000 * 4;

    let interval = setInterval(() => {
        if (accessToken) {
            updateToken();
        }
    }, fourMinutes);

    return () => clearInterval(interval);
}, [accessToken, loading, updateToken]);

  
  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? null : props.children}
    </AuthContext.Provider>
  );
}; 

export default AuthState;
