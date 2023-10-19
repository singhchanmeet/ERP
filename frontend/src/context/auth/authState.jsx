import AuthContext from "./authContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to import axios

const AuthState = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:8000";
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') ? (localStorage.getItem('accessToken')) : null); // State to store the authentication token
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken') ? (localStorage.getItem('refreshToken')) : null); // State to store the authentication token
  const [loading, setLoading] = useState(true)


  const updateToken = async () => {
    
    let response = await fetch(`${host}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: accessToken,
    })

    let data = await response.json()

    if (response.status === 200) {
      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
    } else {
      logoutUser()
    }

    if (loading) {
      setLoading(false)
    }
  }
  // // Login a user
  // const handleLogin = async (user_id, password) => {
  //   try {
  //     const response = await axios.post(`${host}/authenticate/student/login/`, {
  //       user_id,
  //       password,
  //     });

  //     if (response.status === 200) {
  //       // Assuming the server returns a token upon successful login
  //       const token = response.data.accessToken;
  //       // Save the token to state
  //       setAccessToken(token);
  //       // Redirect the user to the dashboard or any other protected route
  //       navigate("/dashboard");
  //     } else {
  //       // Handle authentication failure
  //       console.error("Authentication failed");
  //       // You can set an error message state to display to the user
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     // Handle error and show appropriate message to the user
  //   }
  // };

  //logout function

  let logoutUser = () => {
    setAccessToken(null)
    setRefreshToken(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/login')
  }

  //register user


  useEffect(()=> {

    if(loading){
        updateToken()
    }

    let fourMinutes = 1000 * 60 * 4

    let interval =  setInterval(()=> {
        if(accessToken){
            updateToken()
        }
    }, fourMinutes)
    return ()=> clearInterval(interval)

}, [accessToken ,refreshToken , loading])


  // Include the auth state
  const contextValue = {
    accessToken:accessToken,
    refreshToken:refreshToken,
    // handleLogin,
    logoutUser

  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? null : props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
