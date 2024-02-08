import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import LandingButton from '../components/utils/LandingButton'
import Shadow from '../components/utils/Shadow'

const Landing = () => {
  return (
    <Flex alignItems="center" justifyContent="space-around" gap={20}>
      <Flex flexDirection="column" alignItems="flex-start">
        <Text fontSize="5xl" className="sub-heading" bgGradient={"linear(to-r, white.light, purple.shadowLight)"} bgClip="text">
          Buy and sell
        </Text>
        <Text fontSize="6xl" className="sub-heading" bgGradient={"linear(to-r, white.light, purple.shadowLight)"} bgClip="text">
          your favourite games
        </Text>
        <Text fontSize="md" my={6} w={{base: 300, md: 500}} bgGradient={"linear(to-r, white.light, white.dark)"} bgClip="text">
          An extensive marketplace for gamers who dream to own the most popular and renowned games
        </Text>
        <LandingButton text="Shop now"/>
      </Flex>
      <Box position="relative">
        <Image src="/gaming-controller.png" alt="gaming-controller-image" w={{base: 300, md: 550}} />
        <Shadow top={300} left={100} blur={500} spread={100} color="#d837b9"/>
      </Box>
    </Flex>
  )
}

export default Landing