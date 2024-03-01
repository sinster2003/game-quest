import { Box, Container, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import Layout from './components/Layout/Layout';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <Container minW={{md:'8xl'}}>
      <Layout>
        <Outlet />
      </Layout>
    </Container>
  )
}

export default App;