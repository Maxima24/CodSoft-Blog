import { createContext, useContext, useState } from "react";

 const LoginContext= createContext()
 export  const LoginProvider =  ({children}) =>{
    const [userData,setUserdata] = useState({
        email:"",
        username:"",
        password:""
    })
    return(
        <LoginContext.Provider value={{ userData, setUserdata }}>
        {children}
      </LoginContext.Provider>
    )
 }  
 // eslint-disable-next-line react-refresh/only-export-components
 export const  useLogin = ()=> useContext(LoginContext)
  