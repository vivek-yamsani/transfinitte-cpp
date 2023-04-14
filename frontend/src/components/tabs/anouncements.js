import { VStack, Flex, Center, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    Wrap, Heading
    , Modal,
    ModalOverlay,
    HStack,
    ModalContent,
    ModalHeader,
FormControl,
FormLabel,
Input,
    useDisclosure,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { GetAnnouncements } from "../../fetchData";
import { Announcecard } from "../cards/announcementCard";

import { useNavigate } from "react-router-dom";
import SignupForm from "../forms/signupform";
import { Addrep } from "../../fetchData";
import AddCompany from "../forms/addAnnouncements";
export function Anouncements({ id, role, name }) {
    const navigate = useNavigate();
    const toast = useToast();
    
    const [announcements, setannouncements] = useState([])
    const [isLoading, setLoading] = useState(false);

    const [rollno, setrollno] = useState('');
    const [isOpen1,setisOpen]=useState(false);
    const mclose1=()=>{
        setisOpen(!isOpen1);
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const mclose = () => {
        onClose();
    }
    const announcementCard = announcements.map((item) => {
        return <Announcecard id={item.id} title={item.title} desc={item.description} LastEdited={item.LastEdited} author={item.author} name={name} />
    })
    useEffect(() => {
         GetAnnouncements({ id, Role: role }).then((data)=>{setannouncements(data)});
    }, [])
    return (
        <HStack>
            < Wrap spacing='10' py={10} direction='column' justify={'space-around'} overflowY={'scroll'} minH={'auto'} h={700} align='center' flex={1}>
                {(announcementCard.length === 0) ?
                    (<Heading color={'red'}>No Announcements  to show</Heading>) : announcementCard
                }
            </Wrap >
            {
                (role !== 'STUDENT') &&
                <Button
                    pos={'absolute'}
                    colorScheme={'teal'}
                    left={'80%'}
                    bottom={'75%'}
                    onClick={() => {
                        navigate(
                            '../addform',
                            {
                                state: {
                                    id,
                                    name,
                                    purpose: 'announce',

                                }
                            }
                        )
                        navigate(0);
                    }}
                >
                    <AddIcon />
                    Add
                </Button>
            }
            {
                role === 'ADMIN' &&
                <div>

                    <Button
                        pos={'absolute'}
                        colorScheme={'teal'}
                        left={'80%'}
                        bottom={'65%'}
                        onClick={onOpen}
                    >Add Representaive
                    </Button>
                    <Button
                        pos={'absolute'}
                        colorScheme={'teal'}
                        left={'80%'}
                        bottom={'55%'}
                        onClick={()=>setisOpen(true)}
                    >Add ADMIN
                    </Button>
                </div>
            }

<Modal
                    isOpen={isOpen1}
                    onClose={mclose1}
                >
                    <ModalOverlay />
                    <ModalContent bg={'gray.800'} color={'white'}>
                        <ModalHeader alignSelf={'center'} fontSize={30}>Signup</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6} >
                            <SignupForm onClose={mclose1}/>
                        </ModalBody>
                    </ModalContent>
                </Modal>




            <Modal
                isOpen={isOpen}
                onClose={mclose}
            >
                <ModalOverlay />
                <ModalContent bg={'gray.800'} color={'white'}>
                    <ModalHeader alignSelf={'center'} fontSize={30}>Add Rep</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} >

                        <FormControl paddingY={2}>
                            <FormLabel color={'white'}>Roll no</FormLabel>
                            <Input placeholder={'Enter your rollno id'} onChange={(event) => {
                                setrollno(event.target.value)
                            }} value={rollno} color='blue.200' />
                        </FormControl>
                        <Button colorScheme='blue' mr={3} isLoading={isLoading} alignSelf='center'
                    onClick={async () => {
                        setLoading(true)
                        console.log("rollno",rollno);
                        const res = await Addrep({ id:rollno });

                        if(res===200){
                            toast(
                                {
                                    status: 'success',
                                    variant: 'left-accent',
                                    position: 'bottom-right',
                                    title: `Added Representative`,
                                    isClosable: true,
                                }
                            )
                            setLoading(false);
                            mclose();
                        }
                    }}
                >
                    Add
                </Button>
                    </ModalBody>
                    <ModalFooter>
                    
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </HStack>
    )
}