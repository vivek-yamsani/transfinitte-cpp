import { userContext } from "./userContextProvider";
const { useNavigate } = require("react-router-dom");
const { createContext, useState, useEffect, useContext } = require("react");
export function ProtectedRoute({children}){
    const {user}=useContext(userContext)
    const navigate=useNavigate();
    useEffect(()=>{
        console.log("Re-rendering...",user);
        if(!user.id){
            navigate('/',{ replace: true })
        }
    })

    return (
        <>{children}</>
    )
}