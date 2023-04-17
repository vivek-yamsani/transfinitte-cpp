import { Tabs, TabList, TabPanels, Tab, TabPanel, HStack, Icon, background, Heading, Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { ArrowDownIcon, TriangleDownIcon } from '@chakra-ui/icons'
import Login from './login'
import { Companies } from '../components/tabs/companies'
import Welcome from './Welcome'
import { Anouncements } from '../components/tabs/anouncements'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../config/userContextProvider'
export function Student() {
    const {user,changed}=useContext(userContext);
    const studentid=user.id;
    return (
        <Flex
            w={'100%'}
            h={'100%'}
            pt={0}
            mt={'-1'}
        >
            <Tabs w={'100%'} variant='soft-rounded'>
                <TabList w={'100%'} borderBottom={'none'} backgroundColor={'blackAlpha.700'} py={3}>
                    <Tab flex={1} _selected={{ color: 'white', bg: 'teal' }} color={'white'}>Announcements</Tab>
                    <Tab flex={1} _selected={{ color: 'white', bg: 'teal' }} color={'white'}>Current Companies</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        < Anouncements id={studentid} role='STUDENT'/>
                    </TabPanel>
                    <TabPanel>
                        <Companies   id={studentid} role='STUDENT'/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex >
    )
}