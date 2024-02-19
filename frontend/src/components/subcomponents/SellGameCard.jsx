import { Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import useToaster from '../../hooks/useToaster';

const SellGameCard = ({game_id}) => {
    const [game, setGame] = useState(null);
    const toast = useToaster();

    useEffect(() => {
        console.log(typeof(game_id));
        if(typeof game_id === "string") {
            console.log("HI")
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
        <p>Loading...</p>
    }

  return (
    <Flex flexDirection="column" bg="purple.500" pb={4} mt={4}>
        <Image src="/GTAV.png" alt={game?.title} h={300} w={300} objectFit="cover"/>
        <Text fontSize="xl" pt={3} color="purple.900" textAlign="center" className="sub-heading">{game?.title}</Text>
        <Text fontSize="md" color="purple.100" fontWeight={600} textAlign="center">{game?.description?.length > 25 ? `${game?.description}...`: game?.description}</Text>
        <Text fontSize="md" color="purple.100" fontWeight={600} textAlign="center">$ {game?.price}</Text>
    </Flex>
  )
}

export default SellGameCard