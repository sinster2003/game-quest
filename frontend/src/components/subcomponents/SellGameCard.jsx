import { Flex, Icon, Image, Text } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import useToaster from '../../hooks/useToaster';
import { MdDelete } from "react-icons/md";

const SellGameCard = ({game_id, handleDelete}) => {
  const [game, setGame] = useState(null);
  const toast = useToaster();

  useEffect(() => {
    if(typeof game_id === "string") {
      axios.get(`/api/v1/owners/get-game/${game_id}`)
      .then(res => res.data)
      .then(result => setGame(result.game))
      .catch((error) => {
        console.log(error)
        toast("Error occurred", error?.response?.data?.message || "Something went wrong", "error");
      })
    }    
  }, [game_id]);

  if(!game) {
    return <p>Loading...</p>
  }

  return (
    <Flex flexDirection="column" bg="purple.500" pb={4} mt={4} position="relative">
        <Icon as={MdDelete} h={10} w={10} color="purple.bg" position="absolute" right={2} top={2} bg="whiteAlpha.800" p={2} borderRadius="50%" _hover={{bg: "whiteAlpha.600"}} cursor="pointer" onClick={handleDelete}/>
        <Image src="/GTAV.png" alt={game?.title} h={300} w={300} objectFit="cover"/>
        <Text fontSize="xl" pt={3} color="purple.900" textAlign="center" className="sub-heading">{game?.title}</Text>
        <Text fontSize="md" color="purple.100" fontWeight={600} textAlign="center">{game?.description?.length > 25 ? `${game?.description}...`: game?.description}</Text>
        <Text fontSize="md" color="purple.100" fontWeight={600} textAlign="center">$ {game?.price}</Text>
    </Flex>
  )
}

export default SellGameCard