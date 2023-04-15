import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon } from '@chakra-ui/icons'
import { FaBeer } from 'react-icons/fa';
import { Flex, Wrap } from '@chakra-ui/react';
import { BsChevronRight } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";


import { Heading, Text, WrapItem, ArrowRightIcon, HStack, Button, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { setNestedObjectValues } from 'formik';
import { getStatus } from '../../fetchData';

export function Companiescard({ isApplied, sal, createdAt, title, name, role, id, personrole, application_status }) {
    const navigate = useNavigate();
    console.log("Personrole", personrole);
    const [status, setStatus] = useState(application_status ? application_status : 'not yet applied');
    // useEffect(async ()=>{
    //     if(isApplied){
    //         const res=await getStatus({id});
    //         setStatus(res);
    //     }
    // },[])
    return (
        <HStack spacing={0}
            bg={'whiteAlpha.900'}
            color={'black'}
            p={5}
            borderTopWidth={20}
            borderColor={personrole !== 'STUDENT' ? 'inherit' : (status === 'not yet applied' ? 'blue' : (status === 'applied' ? ('teal') : (status === 'shortlisted' ? 'yellow.400' : status === 'rejected' ? 'red' : 'inherit')))}
            boxShadow={'0 0 20px 15px'}
            borderRadius={10}
        >
            <VStack
                width={600}
                spacing={0}
                borderRadius={10}
                onClick={() =>{
                    navigate(
                        '/app/details',
                        {
                            state: {
                                id,
                                name,
                            }
                        }
                    )
                    navigate(0);}
                }
                _hover={{ cursor: 'pointer' }}
                align='stretch'
            >
                <HStack>
                    <Heading>{title}</Heading>
                </HStack>
                <Flex justify={'space-between'} align={'center'}>
                    <Text flex={1}><b>Role:</b>{role}</Text>
                    <Text><b>CTC:</b>₹{sal}</Text>
                </Flex>
                <Text><b>createdAt:</b>{createdAt}</Text>
                {
                    personrole === 'STUDENT' &&
                    <Text><b>Status:</b>{status}</Text>
                }
            </VStack>
            <BsChevronRight style={{ width: '50px', height: '35px' }} />
        </HStack>
    )
}
