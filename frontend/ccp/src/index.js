import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import CircleIcon from './components/circleIcon';
import { background, Button, ChakraProvider, color, Text, Stack, HStack, VStack, Box, Center, Heading } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon,RepeatClockIcon,ArrowBackIcon,ArrowForwardIcon } from '@chakra-ui/icons'
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import Login from './screens/login';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <body>
        <BrowserRouter>
        <Routes>
              <Route  path='/' element={<Login/>}/>
              <Route  path='/login' element={<Login/>} />
              <Route  path='/app/*'   element={<App/>}/>
        </Routes>
        </BrowserRouter>
            </body>
    </ChakraProvider >
);
