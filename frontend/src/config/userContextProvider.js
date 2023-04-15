import { Fetch } from "../fetch_function";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";
const { useState, useEffect,createContext } = require("react");
const userContext=createContext();
export function UserProvider({children}){
    const [token,settoken]=useState(localStorage.getItem("token"));
    const [user,setUser]=useState({});
    const [isLoading,setLoading]=useState(true);
    const [tokenchanged,settokenchanged]=useState(false);
    const getDetails=async ()=>{
        const res=await Fetch(`${API_URL}/details`);
        const jsonRes=await res.json();
        return { status: res.status, "data": jsonRes }
    }
    
    useEffect(()=>{
        getDetails().then((res)=>{
            if(res.status==200){
                setUser(res.data);
            }else setUser({})
            setLoading(false);
        });
    },[tokenchanged])
    
    useEffect(()=>{
        console.log("Render-user-pro",user);
    })
    
    return(
        isLoading?<></>:
        <userContext.Provider value={{user,changed:settokenchanged,tokenchanged}}>
            {children}
        </userContext.Provider>
    )
}
export {userContext}