import { Heading, Spacer, StackDivider, VStack, Divider, HStack , Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react"
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginForm from "../components/forms/loginform";
export default function Login() {
   const navigate=useNavigate();
   const location=useLocation();
   let id;
  if(location.state!==null)
  id= location.state.id;
  const isStudent=(id===1);
  useEffect(()=>{
    console.log("from login page:",id);
  })
    return (
        <VStack
            bg='rgb(36, 37, 37)'
            width={'100%'}
            h={'100%'}
            align={'stretch'}
            padding={0}
            spacing={0}
            pt={0}
        >
            <Heading color={'pink.400'} bg={'black'} p={5} borderBottomWidth='1px' borderColor={'pink.400'}>Campus Placement Portal
            </Heading>
            <VStack align={'center'} justify={'center'} flex={1}>
            <HStack bg={'blackAlpha.600'} padding={20} pt='10' borderRadius={20} marginBottom={40}
            shadow='0 0 7px 5px pink'
            >
            <LoginForm id={id}/>
         
            </HStack>
            </VStack>
        </VStack>
    )
}