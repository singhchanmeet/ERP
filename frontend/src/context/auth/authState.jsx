import AuthContext from "./authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom"


const AuthState = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:8000"
  const credsInitial = []
  const [creds, setCreds] = useState(credsInitial)
  //create a user
  
  

  // Login a user

  // Get user Details
  



  // include the auth state
  const contextValue = {
 
  };
  
  return (
    
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );

}
export default AuthState;