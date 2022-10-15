import { Tabs, TabList, TabPanels, Tab, TabPanel, HStack, Icon, background, Heading, Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { ArrowDownIcon, TriangleDownIcon } from '@chakra-ui/icons'
import Login from './login'
import { Companies } from '../components/tabs/companies'
import Welcome from './Welcome'
import { Anouncements } from '../components/tabs/anouncements'
import { useLocation } from 'react-router-dom'
export function Student() {
    const location = useLocation();
    const studentid = location.state.id;
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
                        < Anouncements id={studentid} />
                    </TabPanel>
                    <TabPanel>
                        <Companies id={studentid} />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Flex >
    )
}