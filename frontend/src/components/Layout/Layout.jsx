import React from 'react'
import Footer from './Footer'
import { Box, Flex } from '@chakra-ui/react'
import NavBar from './NavBar'

const Layout = ({children}) => {
  return (
    <Flex flexDirection="column" justifyContent="space-between" minH="100vh">
        <NavBar/>
        <Box minH="75vh">
          {children}
        </Box>
        <Footer/>
    </Flex>
  )
}

export default Layout