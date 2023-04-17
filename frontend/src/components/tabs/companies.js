import { VStack, Flex, Center, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    Wrap, Heading,
    HStack,
    useDisclosure,
} from "@chakra-ui/react";
import { Companiescard } from "../cards/comapniesCard";
import { AddIcon } from "@chakra-ui/icons";

import { GetAnnouncements } from "../../fetchData";
import { Announcecard } from "../cards/announcementCard";
import { useNavigate } from "react-router-dom";
import AddCompany from "../forms/addAnnouncements";
import { GetCompanies } from "../../fetchData";
export function Companies({ id, role,name }) {
    const navigate=useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [companies, setcompanies] = useState([])
    let companyCard = [];
    for(let i = 0; i < companies.length; i++){
        let item = companies[i];
        if(role ==='STUDENT')
        companyCard=[...companyCard,<Companiescard isApplied={item.isApplied} id={item.company.id} title={item.company.name} sal={item.company.CTC} LastEdited={item.company.createdAt} name={name} role={item.company.role} personrole={role} application_status={item.application_status}/>]
        else
        companyCard=[...companyCard,<Companiescard isApplied={0} id={item.id} title={item.name} sal={200000} LastEdited={item.createdAt} name={name} role={item.role} personrole={role}/>]

    }
    useEffect(() => {
        const res = GetCompanies({ id, Role: role }).then((data)=>{setcompanies(data);console.log(data);});
        console.log("Compnay rendering....");
    }, [])
    return (
        <HStack>
            < Wrap spacing='10' py={10} direction='column' justify={'space-around'} overflowY={'scroll'} minH={'auto'} h={700} align='center' flex={1}>
                {(companyCard.length === 0) ?
                    (<Heading color={'red'}>No Companies  to show</Heading>) : companyCard
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
                                purpose:'company'

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