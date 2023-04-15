import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function Admin(){
const [user,setuser]=useState(null)
    useEffect(()=>{
        setuser({name:"yesh"})
    },[])
return (
    <>
    <Heading>{user.name}</Heading>
    </>
)
}