import { VStack, Flex, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Wrap, Heading } from "@chakra-ui/react";
import { GetAnnouncements } from "../../fetchData";
import { Announcecard } from "../cards/announcementCard";
export function Anouncements({ id }) {
    const [announcements, setannouncements] = useState([])
    const announcementCard = announcements.map((item) => {
        return <Announcecard title={item.title} desc={item.desc} />
    })
    useEffect(async () => {
        const res = await GetAnnouncements({ id });
        setannouncements(res);
    }, [])
    return (
            < Wrap spacing='10' py={10} direction='row' justify={'space-around'} overflowY={'scroll'} minH={'auto'} h={700} align='center'  flex={1}>
                {(announcementCard.length === 0) ?
                    (<Heading color={'red'}>No options Availiable to vote</Heading>) : announcementCard
                }
            </Wrap >
    )
}