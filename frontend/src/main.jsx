import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from "@chakra-ui/react";
import theme from './theme/theme.js';
import './index.css';
import Routes from './router/router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  </React.StrictMode>,
)
