import { VStack, Flex, Center, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    Wrap, Heading
    , Modal,
    ModalOverlay,
    HStack,
    ModalContent,
    ModalHeader,
    useDisclosure,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { GetAnnouncements } from "../../fetchData";
import { Announcecard } from "../cards/announcementCard";
import { useNavigate } from "react-router-dom";
import AddCompany from "../forms/addAnnouncements";
export function Anouncements({ id, role,name }) {
    const navigate=useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [announcements, setannouncements] = useState([])
    const announcementCard = announcements.map((item) => {
        return <Announcecard id={item.id} title={item.title} desc={item.description} LastEdited={item.LastEdited} author={item.author} name={name}/>
    })
    useEffect(async () => {
        console.log('Announcements', role);
        const res = await GetAnnouncements({ id, Role: role });
        console.log("Response fomr server", res);
        setannouncements(res);
    }, [])
    return (
        <HStack>
            < Wrap spacing='10' py={10} direction='column' justify={'space-around'} overflowY={'scroll'} minH={'auto'} h={700} align='center' flex={1}>
                {(announcementCard.length === 0) ?
                    (<Heading color={'red'}>No Announcements  to show</Heading>) : announcementCard
                }
            </Wrap >
            {
            (role==='REPRESENTATIVE')&&
            <Button
                pos={'absolute'}
                colorScheme={'teal'}
                left={'80%'}
                bottom={'75%'}
                onClick={()=>{
                    navigate(
                        '/app/addform',
                        {
                            state: {
                                id,
                                name,
                                purpose:'announce',

                            }
                        }
                        )  
                }}
            >
                <AddIcon />
                Add
                </Button>
}
        </HStack>
    )
}