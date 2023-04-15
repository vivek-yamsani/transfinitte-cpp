import logo from './logo.svg';
import './App.css';
import { Text, HStack, VStack, Button, Heading, Toast, useToast } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Details from './screens/details';
import { CicRep } from './screens/Cicrep';
import { Student } from './screens/Student';
import { Admin } from './screens/Admin';
import AddCompany from './components/forms/addAnnouncements';
import { userContext } from './config/userContextProvider';
function App() {
  const navigate = useNavigate();
  const toast = useToast();
  const {user,changed,tokenchanged}=useContext(userContext)
  const studentid=user.id;
  useEffect(()=>{
    console.log("opoop");
  })
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
        <HStack justify={'space-between'}>
          <Text fontSize={'2xl'}>Hi!! {user.id}</Text>
          <Button onClick={() => {
            localStorage.removeItem("token");
            changed(!tokenchanged);
          }}>Logout{<ChevronRightIcon boxSize={5} />}</Button>
        </HStack>
        <div className='appContainer'>
          <HStack w={'100%'} h={'100%'}>
            <Routes>
              <Route path='/student' element={user.role=='STUDENT'?<Student/>:<Heading>UnAuthorized Access</Heading>}
              />
              <Route path='/admin' element={user.role=='ADMIN'?<Admin/>:<Heading >UnAuthorized Access</Heading>} />
              <Route path='/cicrep' element={user.role=='REPRESENTATIVE'?<CicRep/>:<Heading justifyContent={'center'}>UnAuthorized Access</Heading>} />
              <Route path='/addform' element={user.role !=='STUDENT'?<AddCompany/>:<Heading justifyContent={'center'}>UnAuthorized Access</Heading>} />
              <Route path='/details' element={<Details />} />
            </Routes>
          </HStack>
        </div>
      </VStack>
    </div>
  );
}

export default App;
