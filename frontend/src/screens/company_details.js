import {
    Button, Heading, VStack, Text, HStack, Box,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Modal,
    useDisclosure,
    Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { Fetch } from "../fetch_function";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../config/userContextProvider";
import { useContext } from "react";
import { AddShortlist } from "../components/forms/addShotlist";
export default function Company_Details() {
    const [details, setDetails] = useState({});
    const { user } = useContext(userContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setstatus] = useState('')
    const role = user.role;
    const navigate=useNavigate();
    const params = useParams();
    console.log("params", params);
    
    useEffect(() => {
            const id = params.id;
            console.log("id");
            Fetch(`${API_URL}/companies/getdetails/${id}`).then((res) => res.json()).then((data) => { setDetails(data);console.log("data", details);});
            Fetch(`${API_URL}/companies/getstatus/${id}`).then((res) => res.json()).then((data) => { setstatus(data.application_status);console.log("status", data.application_status != 'not yet applied')});

        }, []);

    const companyid = params.id;
    const modal = (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent bg={'gray.800'} color={'white'}>
                <ModalHeader alignSelf={'center'} fontSize={30}>Add Shortlist</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6} >
                    <AddShortlist id={companyid} name={details.name} eligible_depts={details.eligible_departments}></AddShortlist>
                </ModalBody>
            </ModalContent>
        </Modal>
    );

    return (
        <>
            <VStack width={'50%'} alignSelf={'flex-start'} mt={'10px'} ml={'25%'} overflowY={'auto'} maxH={'100%'} padding={5}>
                <Box bg={'Background'} paddingX={'10%'} paddingY={'15px'} borderRadius={'md'} display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <Heading>{details.name}</Heading>
                    <Heading size={'sm'}>Role: {details.role} </Heading>
                    <VStack justifyContent={'center'} alignItems={'flex-start'} mt={'20px'} ml={'-80px'}>
                        <Text>
                            Cgpa Criteria: {details.cgpa_criteria} above
                        </Text>
                        <Text>
                            sal: {details.sal == undefined ? '2lpa' : details.sal}
                        </Text>
                    </VStack>
                </Box>
                <Box maxH={'100%'} overflow={'auto'} bg={'Background'} borderRadius={'md'} padding={5}>
                    <Text>
                        {details.description}
                    </Text>
                    <Text fontFamily={'fantasy'} fontSize={'2xs'} mt={'20px'}>
                        Created @ {new Date(details.createdAt).toLocaleString()}
                    </Text>
                </Box>
            </VStack>
            <VStack position={'absolute'} top={10} right={10} spacing={5}>
                {
                    (role != 'STUDENT') ?
                        <>
                            <Button>
                                Edit
                            </Button>
                            <Button>
                                Delete
                            </Button>
                            <Button onClick={onOpen}>
                                Add Interview ShortList
                            </Button>
                            <Button>
                                Add Final List
                            </Button>
                            <Button onClick={()=>{
                                navigate(`/app/chat/${companyid}`,{
                                        state: {
                                            details,
                                        }
                                })
                            }}>
                                Chat
                            </Button>
                        </>
                        :
                        <>
                            <Button isDisabled={status != 'not yet applied'}>
                                Mark As Applied
                            </Button>
                            <Button onClick={()=>{
                                navigate(`/app/chat/${companyid}`,{
                                        state: {
                                            details,
                                        }
                                })
                            }}>
                                Chat
                            </Button>
                        </>
                }
            </VStack>
            {modal}
        </>
    )
}
