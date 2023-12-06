import React, {createContext, useEffect, useState} from 'react';

export const ContextProvider = createContext();
const Context = props => {
  const [LoginState, SetLoginState] = useState(false);


  const setLOGINSTATE=(value)=>{
SetLoginState(true)
  }

  return (
    <>
      <ContextProvider.Provider
        value={{
          LoginState,
          setLOGINSTATE
        }}>
        {props.children}
      </ContextProvider.Provider>
    </>
  );
};

export default Context;
