import { Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const GameCard = ({game}) => {
  return (
    <Flex flexDirection="column" bg="purple.500" pb={4} mt={1} position="relative">
        <Image src={game?.image || "/GTAV.png"} alt={game?.title} h={300} w={300} objectFit="cover" objectPosition="top"/>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" my={4}>
            <Text fontSize="xl" color="purple.900" textAlign="center" className="sub-heading">{game?.title?.length > 10 ? `${game?.title}...`: game?.title}</Text>
            <Text fontSize="lg" color="purple.bg" fontWeight={700} textAlign="center">${game?.price}</Text>
        </Flex>
        <Flex justifyContent="center" gap={4}>
            <Button bg="purple.200" color="purple.bg" _hover={{}} _focus={{}} _active={{}}>Add to Cart</Button>
            <Button bg="purple.bg" color="white.light" _hover={{}} _focus={{}} _active={{}}>Buy Now</Button>
        </Flex>
    </Flex>
  )
}

export default GameCard