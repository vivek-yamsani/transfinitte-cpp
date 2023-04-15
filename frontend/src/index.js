import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { background, Button, ChakraProvider, color, Text, Stack, HStack, VStack, Box, Center, Heading } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon, RepeatClockIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './screens/Welcome';
import reportWebVitals from './reportWebVitals';
import Login from './screens/login';
import { UserProvider } from './config/userContextProvider';
import { ProtectedRoute } from './config/ProtectedRoute';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <body>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/app/*' element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            } />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </body>
  </ChakraProvider >
);
