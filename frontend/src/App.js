import logo from './logo.svg';
import './App.css';
import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon, RepeatClockIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Wrap, WrapItem } from '@chakra-ui/react'
import { Divider, StackDivider } from '@chakra-ui/react'
import { background, Button, ChakraProvider, color, Text, Stack, HStack, VStack, Box, Center, Heading } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Details from './screens/details';
import {CicRep}  from './screens/Cicrep';
import { Student } from './screens/Student';
import { Admin } from './screens/Admin';
import Login from './screens/login';
import AddCompany from './components/forms/addAnnouncements';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setname] = useState('');
  useEffect(() => {
    console.log("In App Component", location.state);
    if (location.state !== null) {
      setname(location.state.name)
    }
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <VStack 
        w={'100%'}
        h={'100%'}
        bg={'rgb(46, 44, 44)'}
        p={50}
        pt={5}
        align={'strech'}
        spacing={5}
      >
        <div className='header'>
          <Text>Hi!! {name}..</Text>
        </div>
        <div className='appContainer'>

          <HStack  w={'100%'} h={'100%'}>
          <Routes>
            <Route path='/student' element={<Student />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/cicrep' element={<CicRep />} /> 
            <Route path='/addform' element={<AddCompany/>}/>
            <Route path='/details' element={<Details/>}/>
          </Routes>
          </HStack>
        </div>
      </VStack>
    </div>
  );
}

export default App;
