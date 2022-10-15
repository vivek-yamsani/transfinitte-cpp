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
import { useEffect, useState } from 'react';
import { Signup } from '../../fetchData';
import { createSearchParams, useNavigate } from "react-router-dom";
export default function SignupForm({ onClose }) {
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [rollno, setrollno] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [name, setname] = useState('');

    const [statusCode, setstatus] = useState(0);
    useEffect(() => {
        console.log('from useeffect', statusCode);
        if (isLoading == true) {
            if (statusCode == 200) {
                toast(
                    {
                        status: 'success',
                        variant: 'left-accent',
                        position: 'bottom-right',
                        title: `Signed up suxccessfully`,
                        isClosable: true,
                    }
                )
            } else {
                if (statusCode == 400) {
                    toast(
                        {
                            status: 'info',
                            variant: 'left-accent',
                            position: 'bottom-right',
                            title: `User Already Exists`,
                            isClosable: true,
                        }
                    )
                } else if (statusCode == 401) {
                    toast(
                        {
                            status: 'info',
                            variant: 'left-accent',
                            position: 'bottom-right',
                            title: `Empty Fields Not Allowed`,
                            isClosable: true,
                        }
                    )
                }else{
                    toast(
                        {
                            status: 'info',
                            variant: 'left-accent',
                            position: 'bottom-right',
                            title: `Server Error`,
                            isClosable: true,
                        }
                    )
                }
            }
            setLoading(false);
        }
    }, [statusCode]);
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
            <FormControl paddingY={2}>
                <FormLabel color={'white'}>Email</FormLabel>
                <Input placeholder={'Enter your email'} onChange={(event) => {
                    setemail(event.target.value)
                }} value={email} color='blue.200' />
            </FormControl>
            <FormControl paddingY={2}>
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
                        const res = await Signup({ name, rollno, password, email });
                        setstatus(res);
                    }}
                >
                    Sign Up
                </Button>
                <Button colorScheme={'blue'} onClick={onClose}>Cancel</Button>
            </HStack>
        </div>
    )
}