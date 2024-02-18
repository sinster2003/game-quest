import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const BoughtGameCard = ({game}) => {
  return (
    <Flex flexDirection="column" bg="purple.500" pb={4} mt={4}>
        <Image src="/GTAV.png" alt={game?.title} h={300} w={300} objectFit="cover"/>
        <Text fontSize="xl" pt={3} color="purple.900" my={1} textAlign="center" className="sub-heading">{game?.title}</Text>
        <Text fontSize="md" color="purple.100" fontWeight={600} textAlign="center">{game?.description?.length > 25 ? `${game?.description}...`: game?.description}</Text>
    </Flex>
  )
}

export default BoughtGameCard