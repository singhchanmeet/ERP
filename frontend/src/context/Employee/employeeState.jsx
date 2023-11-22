import EmployeeContext from "./employeeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom"


const EmployeeState = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:8000"
  const credsInitial = []
  const [creds, setCreds] = useState(credsInitial)
  //manage marks

  //counsellor management

  // manage attendance


  // manage assignments and file work

  //placement cell

  //accounts cell

  // include the employee state
  const contextValue = {

  };

  return (

    <EmployeeContext.Provider value={contextValue}>
      {props.children}
    </EmployeeContext.Provider>
  );

}
export default EmployeeState;