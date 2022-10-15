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
    FormErrorMessage,
} from '@chakra-ui/react'
// import { Add_Option, Add_Poll, Add_Team, Login, Signup } from '../../fetchData';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from "react-router-dom";
// import AddForm from './addform';
export default function SignupForm({ onClose }) {
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [rollno, setrollno] = useState('');
    const [password, setpassword] = useState('');
    const [name, setname] = useState('');

    const [details, setdetails] = useState([]);
    useEffect(() => {
        console.log('from useeffect', details);
        if (details.length !== 0) {
            toast(
                {
                    status: 'success',
                    variant: 'left-accent',
                    position: 'bottom-right',
                    title: `Signed Up uccessfully :)${details}`,
                    isClosable: true,
                }
            )
            setLoading(false);
        } else if (isLoading == true) {
            toast(
                {
                    status: 'error',
                    variant: 'left-accent',
                    position: 'bottom-right',
                    title: `Please Check your credentials or try signing up :)${details}`,
                    isClosable: true,
                }
            )
            setLoading(false);
        }
    }, [details]);
    return (
        <div>
            <FormControl paddingY={2}>
                <FormLabel color={'white'}>Name</FormLabel>
                <Input placeholder={'Enter your name'} onChange={(event) => {
                    setname(event.target.value)
                }} value={name} color='blue.200' />
            </FormControl>
            <FormControl paddingY={2}>
                <FormLabel color={'white'}>Roll no</FormLabel>
                <Input placeholder={'Enter your rollno id'} onChange={(event) => {
                    setrollno(event.target.value)
                }} value={rollno} color='blue.200' />
            </FormControl>
            <FormControl  paddingY={2}>
                <FormLabel color={'white'}>password</FormLabel>
                <Input placeholder='password' type={'password'} color='blue.200' onChange={(event) => {
                    setpassword(event.target.value)
                }} value={password} />
            </FormControl>

            <HStack
                pt={10}
                align='center'
                justify={'center'}
                spacing={100}
            >
                <Button colorScheme='blue' mr={3} isLoading={isLoading}
                    onClick={async () => {
                        setLoading(true)
                        // await Signup({ name,rollno, password, setdetails });
                        console.log("details", details);
                    }}
                >
                    Sign Up
                </Button>
                <Button colorScheme={'blue'} onClick={onClose}>Cancel</Button>
            </HStack>
        </div>
    )
}