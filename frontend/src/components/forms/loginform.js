import {
    useToast,
    Button,
    HStack,
    Heading,
    Modal,
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
    Show,
} from '@chakra-ui/react'
// import { Add_Option, Add_Poll, Add_Team, Login } from '../../fetchData';
import { Login } from '../../fetchData';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from "react-router-dom";
import SignupForm from './signupform';
export default function LoginForm({id}) {
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [rollno, setrollno] = useState('');
    const [password, setpassword] = useState('');
    const isAdmin=(id===3);
    const isStudent=(id===1);
    const isCicrep=(id==2);
    const [details, setdetails] = useState([]);
    function showToast(){
        toast(
            {
                status: 'success',
                variant: 'left-accent',
                position: 'bottom-right',
                title: `Welcome to NITT Placement Portal`,
                isClosable: true,
            }
        )
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const mclose = () => {
        onClose();
    }
    useEffect(() => {
        console.log('from useeffect', details);
        console.log("loading",isLoading);
        if (details.length !== 0) {
            const st=details.status;
            const data=details.data;
            if(st==200){
                const role=data.user.role;
                if(isStudent&&role==='STUDENT'){
                showToast();
            navigate(
                '/login',
                {
                    state: {
                        id:data.user.id,
                        name: data.user.name,
                        role,
                    }
                }
            )
            navigate(0);
        }
            else
            if(isCicrep&&role==='REPRESENTATIVE'){
                showToast();
            navigate(
                '/app/cicrep',
                {
                    state: {
                        id:data.user.id,
                        name: data.user.name,
                        role,
                    }
                }
            )
            navigate(0);
            }
            else
            if(isAdmin&&role==='ADMIN'){
                showToast();
            navigate(
                '/app/admin',
                {
                    state: {
                        id:data.user.id,
                        name: data.user.name,
                        role:'ADMIN',
                    }
                }
            )
            navigate(0);
        }
            else{
                toast(
                    {
                        status: 'error',
                        variant: 'left-accent',
                        position: 'bottom-right',
                        title: `Role Invalid`,
                        isClosable: true,
                    }
                ) 
            }
            }
            else{
                toast(
                    {
                        status: 'error',
                        variant: 'left-accent',
                        position: 'bottom-right',
                        title: `${data.message}`,
                        isClosable: true,
                    }
                )
            }
        }else if(isLoading===true){
            toast(
                {
                    status: 'error',
                    variant: 'left-accent',
                    position: 'bottom-right',
                    title: `Please Check your credentials or try signing up`,
                    isClosable: true,
                }
            )
            setLoading(false);
        }
            setLoading(false);
    }, [details]);
    return (
        <div>
            <Heading color={'pink.400'} textAlign='center' pb={10} pt={0}>Login</Heading>
            <FormControl isRequired>
                <FormLabel color={'white'} >{isAdmin?'Admin Id':'Rollno'}</FormLabel>
                <Input placeholder={'username'} onChange={(event) => {
                    setrollno(event.target.value)
                }} value={rollno} color='blue.200' />
            </FormControl>
            <FormControl mt={4} isRequired>
                <FormLabel color={'white'}>password</FormLabel>
                <Input placeholder='password' type={'password'} color='blue.200' onChange={(event) => {
                    setpassword(event.target.value)
                }} value={password} />
            </FormControl>
            <HStack
                pt={10}
                justify={'center'}
                spacing={100}
            >
                <Button colorScheme='blue' mr={3} isLoading={isLoading}
                    onClick={async () => {
                        setLoading(true)
                        console.log("Entries:",rollno,password);
                        const res=await Login({ rollno, password });
                        console.log("Response.....:",res);
                        setdetails(res);   
                    }}
                >
                    Login
                </Button>
                {
                (!isAdmin)&&
                <Button colorScheme={'blue'} onClick={onOpen}>Signup</Button>
                }
                <Modal
                    isOpen={isOpen}
                    onClose={mclose}
                >
                    <ModalOverlay />
                    <ModalContent bg={'gray.800'} color={'white'}>
                        <ModalHeader alignSelf={'center'} fontSize={30}>Signup</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6} >
                            <SignupForm onClose={mclose}/>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </HStack>
        </div>
    )
}