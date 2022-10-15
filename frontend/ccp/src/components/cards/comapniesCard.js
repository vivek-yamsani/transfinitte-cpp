import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon } from '@chakra-ui/icons'
import { FaBeer } from 'react-icons/fa';
import { Flex, Wrap } from '@chakra-ui/react';
import { BsChevronRight } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";


import { Heading, Text, WrapItem, ArrowRightIcon, HStack, Button, VStack } from '@chakra-ui/react'
export function Companiescard({ title, role, status, sal, id, set_selected, createdAt }) {
    const navigate = useNavigate();
    return (
        <HStack spacing={0}
            bg={'whiteAlpha.900'}
            color={'black'}
            p={5}
            borderTopWidth={20}
                borderColor={status==='applied'?'teal':(status==='shortlisted'?'yellow.400':'red')} 
            boxShadow={'0 0 20px 15px'}
            borderRadius={10}
        >
            <VStack
                width={600}
                spacing={0}
                borderRadius={10}
                onClick={() => { set_selected(id) }}
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
                <Text><b>Status:</b>{status}</Text>
            </VStack>
            <BsChevronRight style={{ width: '50px', height: '35px' }} />
        </HStack>
    )
}
