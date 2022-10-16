import { Button, Heading, VStack, Text, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { Fetch } from "../fetch_function";

export default function Details({ id, name }) {
  const [details, setDetails] = useState({});
  const [userRole, setRole] = useState("");
  useEffect(async () => {
    const temp1 = await Fetch(`${API_URL}/announcements/${id}`, null, "GET");
    const temp2 = await Fetch(`${API_URL}/roleFind`);
    setDetails(temp1);
    setRole(temp2);
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
