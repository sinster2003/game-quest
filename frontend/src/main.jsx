import React from 'react'
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import theme from './theme/theme.js';
import './index.css';
import Routes from './router/router.jsx';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
