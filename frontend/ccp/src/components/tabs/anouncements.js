import { VStack, Flex, Center, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Wrap, Heading
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
export function Anouncements({ id ,role}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [announcements, setannouncements] = useState([])
    const announcementCard = announcements.map((item) => {
        return <Announcecard title={item.title} desc={item.description} LastEdited={item.LastEdited} author={item.author}/>
    })
    useEffect(async () => {
        console.log('Announcements',role);
        const res = await GetAnnouncements({ id,Role:role });
        console.log("Response fomr server",res);
        setannouncements(res);
    }, [])
    return (
                <HStack>
            < Wrap spacing='10' py={10} direction='column' justify={'space-around'} overflowY={'scroll'} minH={'auto'} h={700} align='center'  flex={1}>
                {(announcementCard.length === 0) ?
                    (<Heading color={'red'}>No Announcements  to show</Heading>) : announcementCard
                }
            </Wrap >
            <Button
            pos={'absolute'}
            colorScheme={'teal'}
            left={'80%'}
            bottom={'75%'}
            onClick={onOpen}
            >
            <AddIcon/>
            Add</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={'gray.800'} >
          <ModalHeader>Add Announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            </HStack>
    )
}