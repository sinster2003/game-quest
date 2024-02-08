import React from 'react'
import Footer from './Footer'
import { Box } from '@chakra-ui/react'
import NavBar from './NavBar'

const Layout = ({children}) => {
  return (
    <Box>
        <NavBar/>
        {children}
        <Footer/>
    </Box>
  )
}

export default Layout