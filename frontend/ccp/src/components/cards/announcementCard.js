import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon } from '@chakra-ui/icons'
import { FaBeer} from 'react-icons/fa';
import { BsChevronRight } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";


import { Heading, Text, WrapItem, ArrowRightIcon, HStack, Button, VStack } from '@chakra-ui/react'
export function Announcecard({ title,desc, id,name }) {
    const navigate = useNavigate();
    return (
        <HStack spacing={0}
        bg={'whiteAlpha.900'}
                color={'black'}
        p={5}
        boxShadow={'0 0 20px 15px'}
            borderRadius={10}
        >
            <VStack
                
                width={600}
                spacing={0}
                onClick={() => {
                    navigate(
                        '/app/details',
                        {
                            state: {
                                id,
                                name,
                            }
                        }
                        ) 
                }}
                
                _hover={{ cursor: 'pointer' }}
                align='center'
                justify='space-between'
                >
                <Heading>{title}</Heading>
                <Text>{desc}</Text>
            </VStack>
            <BsChevronRight style={{width:'50px',height:'35px'}}/>
                </HStack>
    )
}
