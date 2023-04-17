import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon } from '@chakra-ui/icons'
import { FaBeer } from 'react-icons/fa';
import { BsChevronRight } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Heading, Text, WrapItem, ArrowRightIcon, HStack, Button, VStack,Box } from '@chakra-ui/react'
export function Announcecard({ title, desc, id, name }) {
    const navigate = useNavigate();
    if(desc.length > 50)desc=(desc.substring(0,50) + "...");
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

                _hover={{ cursor: 'pointer' }}
                align='center'
                justify='space-between'
            >
                <Heading>{title}</Heading>
                <Text textOverflow={'ellipsis'}>{desc}</Text>
            </VStack>
            <Box
                _hover={{
                    color: "teal.500",
                    cursor: "pointer"
                }}>

                <BsChevronRight style={{ width: '50px', height: '35px' }}
                    onClick={() => {
                        navigate(
                            '/app/announce_details',
                            {
                                state: {
                                    id,
                                }
                            }
                        )
                    }}

                />
            </Box>
        </HStack>
    )
}
