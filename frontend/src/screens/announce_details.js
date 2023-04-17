import { Button, Heading, VStack, Text, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { Fetch } from "../fetch_function";
import { useLocation } from "react-router-dom";
import { userContext } from "../config/userContextProvider";
import { useContext } from "react";
export default function Announce_Details() {
  const [details, setDetails] = useState({});
  const location = useLocation();
  const {user}=useContext(userContext);
  const role=user.role;
  useEffect(() => {
    if (location.state) {
      const id = location.state.id;
      Fetch(`${API_URL}/announcements/get/${id}`).then((res) =>res.json()).then((data)=>{ setDetails(data); console.log("Data from announce:", data);});
    }
  }, []);
  if (location.state == null) {
    return <></>
  }

  return (
    <>
      <VStack width={'50%'} alignSelf={'flex-start'} mt={'10px'} ml={'25%'} overflowY={'auto'} maxH={'100%'} padding={5}>
        <Heading>{details.title}</Heading>
        <Text>{details.description} </Text>
      </VStack>
      {
        (role!='STUDENT')?
        <VStack position={'absolute'} top={10} right={10} spacing={5}>
        <Button>
          Edit
        </Button>
        <Button>
          Delete
        </Button>
        </VStack>
        :
        <></>
      }
    </>
  )
}
