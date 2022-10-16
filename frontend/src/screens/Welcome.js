import {
    Heading, Spacer, StackDivider, VStack, Divider, HStack, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    Box,
    Text,
    Img,
    Image,
    FormLabel,
    Center,
    Input,
    Button,
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useNavigate,useLocation  } from "react-router-dom";
export default function Welcome() {
    const navigate=useNavigate();
    const location = useLocation();
    const [loading,setLoading]=useState(false);
    return (
        <VStack
            bg='rgb(36, 37, 37)'
            width={'100%'}
            h={'100%'}
            align={'stretch'}
            padding={0}
            spacing={0}
            overflow={'hidden'}
            pt={0}
        >
            <Heading color={'pink.400'} bg={'black'} p={5} borderBottomWidth='1px' borderColor={'pink.400'}>Campus Placement Portal
            </Heading>
            <HStack padding={'30'} paddingLeft='100' spacing={250}>
            <VStack >

            <Heading color={'white'} textAlign='center' pt='2'>Login</Heading>
                <VStack bg={'blackAlpha.600'} paddingY={20} paddingX={150} borderRadius={20} marginBottom={40}
                    spacing={10}
                    
                    color={'white'}
                    align='strech'
                    justify={'center'}
                >
                    <Button colorScheme={'cyan'} p={12} _hover={{
                            opacity:(0.5)
                    }}
                    onClick={()=>
                        navigate(
                            '/login',
                            {
                                state: {
                                    id:1,
                                }
                            }
                            )
                            
                        }
                        >Student</Button>
                    <Button colorScheme={'cyan'} p={12} _hover={{
                            opacity:(0.5)
                    }}
                    onClick={()=>{
                        navigate(
                            '/login',
                            {
                                state: {
                                    id:2,
                                }
                            }
                        )
                    }}
                    >Representative</Button>
                    <Button colorScheme={'cyan'} p={12} _hover={{
                         opacity:(0.5)
                    }}
                    onClick={()=>
                        navigate(
                            '/login',
                            {
                                state: {
                                    id:3,
                                }
                            }
                            )
                        }
                    >Admin</Button>
                        </VStack>
                </VStack>
                <Box   >
                <Image
  borderRadius='50%'
  borderColor='red'
  borderWidth='100px'
  boxSize='md'
  
  src={require('../images/capstone.jpg')}
  alt='Dan Abramov'
/>
<Heading color={'pink'}>Training and Placement Cell<br/><Center>Nit Trichy
    </Center></Heading>
                </Box>
         </HStack>
        </VStack>
    )
}
