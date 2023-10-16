import AuthContext from "./authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to import axios

const AuthState = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:8000";
  const [token, setToken] = useState(null); // State to store the authentication token

  // Login a user
  const handleLogin = async (user_id, password) => {
    try {
      const response = await axios.post(`${host}/authenticate/student/login/`, {
        user_id,
        password,
      });

      if (response.status === 200) {
        // Assuming the server returns a token upon successful login
        const token = response.data.access_token;
        // Save the token to state
        setToken(token);
        // Redirect the user to the dashboard or any other protected route
        navigate("/dashboard");
      } else {
        // Handle authentication failure
        console.error("Authentication failed");
        // You can set an error message state to display to the user
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle error and show appropriate message to the user
    }
  };

  //logout function


  //register user


  
  // Include the auth state
  const contextValue = {
    token,
    handleLogin,

  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
   