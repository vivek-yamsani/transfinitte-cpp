import { Tabs, TabList, TabPanels, Tab, TabPanel, HStack, Icon, background, Heading, Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { ArrowDownIcon, TriangleDownIcon } from '@chakra-ui/icons'
import Login from './login'
import { Companies } from '../components/tabs/companies'
import Welcome from './Welcome'
import { Anouncements } from '../components/tabs/anouncements'
import { useContext, useEffect } from 'react'
import { userContext } from '../config/userContextProvider'
export function CicRep() {
    const {user,changed,tokenchanged}=useContext(userContext)
  const studentid=user.id;
  const role=user.role;
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
                <TabPanels >
                    <TabPanel>
                        < Anouncements role={role} name={user.name} id={user.id}/>
                    </TabPanel>
                    <TabPanel>
                        <Companies role={role} name={user.name} id={user.id}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Flex >
    )
}