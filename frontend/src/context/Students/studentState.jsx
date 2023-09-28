import StudentContext from "./studentContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom"


const StudentState = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:8000"
  const credsInitial = []
  const [creds, setCreds] = useState(credsInitial)
  

  //submit work
  
  

  // attendance

  // Get student ,marks and fees Details
  



  // include the student state
  const contextValue = {
    
  };
  
  return (
    
    <StudentContext.Provider value={contextValue}>
      {props.children}
    </StudentContext.Provider>
  );

}
export default StudentState;