import UtilsContext from "./utilsContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom"


const UtilsState = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:8000 "
  const credsInitial = []
  const [creds, setCreds] = useState(credsInitial)


  // Time table

  // Infrastructure




  // include the utils state
  const contextValue = {

  };

  return (

    <UtilsContext.Provider value={contextValue}>
      {props.children}
    </UtilsContext.Provider>
  );

}
export default UtilsState;