import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Wrap, Heading } from "@chakra-ui/react";
import { GetAnnouncements } from "../../fetchData";
import { Announcecard } from "../cards/announcementCard";
import { Companiescard } from "../cards/comapniesCard";
import { GetCompanies } from "../../fetchData";
export function Companies({ id }) {
    const [announcements, setannouncements] = useState([])
    const announcementCard = announcements.map((item) => {
        return <Companiescard title={item.title} role={item.role} sal={item.sal} status={item.status} createdAt={item.createdAt}/>
    })
    useEffect(async () => {
        const res = await GetCompanies({ id });
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