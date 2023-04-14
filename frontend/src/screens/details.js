import { Button, Heading, VStack, Text, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { Fetch } from "../fetch_function";

export default function Details({ id, name }) {
  const [details, setDetails] = useState({});
  const [userRole, setRole] = useState("");
  useEffect(() => {
    const temp1 = Fetch(`${API_URL}/announcements/${id}`, null, "GET").then((data)=>setDetails(data));
    const temp2 = Fetch(`${API_URL}/roleFind`).then((data)=>setDetails(data));
  }, []);
  return (
    <>
      {userRole == "" ? (
        <></>
      ) : (
        <>
          {userRole == "STUDENT" ? (
            <>
              <VStack>
                <Text>Title</Text>
                <Heading>{details.title}</Heading>
                <Text>Description</Text>
                <Text>{details.description}</Text>
              </VStack>
            </>
          ) : (
            <>
              <VStack>
                <Text>Title</Text>
                <Heading>{details.title}</Heading>
                <Text>Description</Text>
                <Text>{details.description}</Text>
              </VStack>
            </>
          )}
        </>
      )}
    </>
  );
}
