import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import { Text, HStack, VStack, Button, Heading, Toast, useToast } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Announce_Details from './screens/announce_details';
import { CicRep } from './screens/Cicrep';
import { Student } from './screens/Student';
import { Admin } from './screens/Admin';
import AddCompany from './components/forms/addAnnouncements';
import { userContext } from './config/userContextProvider';
import Company_Details from './screens/company_details';
import { API_URL } from './constants';
import ChatScreen from './screens/ChatScreen';

function App() {
  const navigate = useNavigate();
  const toast = useToast();
  const {user,changed,tokenchanged}=useContext(userContext)
  const studentid=user.id;
  const [socket,setsocket]=useState(null);
  useEffect(()=>{
    console.log("opoop");
  })
  useEffect(()=>{
    if(socket==null){
    setsocket(io.connect(API_URL));
    console.log("conntection done");
  }
  },[socket])

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
          <HStack w={'100%'} h={'100%'} pos={'relative'}>
            <Routes>
              <Route path='/student' element={user.role=='STUDENT'?<Student/>:<Heading>UnAuthorized Access</Heading>}
              />
              <Route path='/admin' element={user.role=='ADMIN'?<Admin/>:<Heading >UnAuthorized Access</Heading>} />
              <Route path='/cicrep' element={user.role=='REPRESENTATIVE'?<CicRep/>:<Heading justifyContent={'center'}>UnAuthorized Access</Heading>} />
              <Route path='/addform' element={user.role !=='STUDENT'?<AddCompany/>:<Heading justifyContent={'center'}>UnAuthorized Access</Heading>} />
              <Route path='/announce_details' element={<Announce_Details role={user.role}/>} />
              <Route path='/company_details' element={<Company_Details/>} role={user.role}/>
              <Route path='/chat/:id' element={<ChatScreen/>} />
            </Routes>
          </HStack>
        </div>
      </VStack>
    </div>
  );
}

export default App;
