import React, {createContext, useEffect, useState} from 'react';

export const ContextProvider = createContext();
const Context = props => {
  const [LoginState, SetLoginState] = useState(false);
  const [TOKEN,setToken] =useState("")
 const [updation,setUpdation]=useState([])
 const [selectedRequestCategory,setselectedRequestCategory] = useState("")

  const setLOGINSTATE=(value)=>{
    SetLoginState(value)
  }

  const TokenSetter=(value)=>{
 setToken(value)
  }

  return (
    <>
      <ContextProvider.Provider
        value={{
          LoginState,
          setLOGINSTATE,
          TOKEN,
          TokenSetter,
          updation,setUpdation,
          selectedRequestCategory,setselectedRequestCategory
        }}>
        {props.children}
      </ContextProvider.Provider>
    </>
  );
};

export default Context;
