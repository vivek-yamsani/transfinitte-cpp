import {
    Heading,
    Text, Box, Button, Textarea, Avatar,
    ModalContent,
    ModalHeader,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalCloseButton, VStack, HStack, Spacer, Flex, Divider, useColorModeValue, useDisclosure, useToast, Input
} from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../constants";

import { Fetch } from "../fetch_function";
import { userContext } from "../config/userContextProvider";
import { GetMesseges } from "../fetchData";
import { AddMsg } from "../fetchData";
import { useContext } from "react";
import Convcard from "../components/cards/convCard";

export default function ChatScreen() {
    const location = useLocation();
    const [msg, setmsg] = useState('');
    const [conv, setconv] = useState([]);
    const [details, setDetails] = useState({})
    const [isLoading, setLoading] = useState(false)
    const id = useParams().id
    const usercontext = useContext(userContext);
    const { user } = usercontext;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()

    const fetch = async () => {
        setLoading(true)
        let messeges = await GetMesseges(id);
        if (messeges.status==200) {
            let temp = messeges.data;
            temp = await temp.map((x) => <Convcard data={x} key={x.id}></Convcard>)
            setconv(temp);
        }
        Fetch(`${API_URL}/companies/getdetails/${id}`).then((res) => res.json()).then((data) => { setDetails(data);console.log("data", data);});
        setLoading(false)
    }

    const mclose = () => {
        fetch();
        onClose();
    }


    useEffect(() => {
       fetch();
        // getusername(data.raisedbyid).then((data) => setraisedname(data))
    }, [])

    const addmsg = async () => {
        let res = await AddMsg(user.id, details.id, msg);
        setmsg("");
        if (res.status != 200) {
            toast({
                title: 'server error',
                status: 'error',
                isClosable: true,
            })
        } else
            fetch();
    }
    return (
        <VStack w={'100%'} p={5} h={'100%'} alignSelf={'flex-start'} flex={1} alignItems={'flex-start'} overflowY={'auto'} spacing={'2'} pos={'relative'}>
            <HStack w={'100%'} >
                <Flex align={'center'}>
                    <Heading paddingRight={2}>{details.name} </Heading>
                    <Box borderRadius={'50%'} h='10px' w='10px' bg={'Background'}></Box>
                </Flex>
                <Spacer />
            </HStack>
            <Flex w={'50%'} p={2} rounded='md' flexDirection={'column'}>
                <Heading size={'sm'} py={2}>Role: {details.role}</Heading>
                <Heading size={'sm'} py={2}>Description:</Heading>
                <Text>
                    {details.description}
                </Text>
            </Flex>

            <VStack w={'100%'} alignItems={'flex-start'}>
            <VStack w={'50%'} align='center' overflowY={'auto'}>
                <Divider mt={'8px'} />
                {conv}
            </VStack>
            <Textarea w={'50%'} placeholder='Enter Messege...' value={msg} onChange={(e) => setmsg(e.target.value)} />
            <Button flexShrink={0} onClick={addmsg} >Send</Button>
            </VStack>
        </VStack>
    )
}