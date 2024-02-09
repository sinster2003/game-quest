import { Box, Flex, Image, Text } from '@chakra-ui/react'
import LandingButton from '../../utils/LandingButton'
import Shadow from '../../utils/Shadow'
import Subheading from '../../utils/Subheading'
import Subtext from '../../utils/Subtext'

const Herobanner = () => {
  return (
    <Flex alignItems="center" justifyContent="space-around" gap={20}>
      <Flex flexDirection="column" alignItems="flex-start">
        <Subheading text="Buy and sell" size="5xl"/>
        <Subheading text="your favourite games" size="6xl"/>
        <Subtext text="An extensive marketplace for gamers who dream to own the most popular and renowned games"/>
        <LandingButton text="Shop now"/>
      </Flex>
      <Box position="relative">
        <Image src="/gaming-controller.png" alt="gaming-controller-image" w={{base: 300, md: 550}} />
        <Shadow top={300} left={100} blur={500} spread={100} color="#d837b9"/>
      </Box>
    </Flex>
  )
}

export default Herobanner