import { Box, Flex, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Subheading from '../components/utils/Subheading';
import ReviewCard from '../components/subcomponents/ReviewCard';
import LandingButton from '../components/utils/LandingButton';
import Star from '../components/subcomponents/Star';

const GameDetails = () => {
  const {id} = useParams();
  const [game, setGame] = useState(null);
  
  useEffect(() => {
    // game to be fetched
    const getGame = async () => {
        const response = await axios.get(`/api/v1/customers/get-game-details/${id}`);
        const result = await response.data;
        setGame(result);
    }
    getGame();
  }, [id]);

  if(!game) {
    return <p>Loading...</p>
  }

  return (
    <Flex flexDirection="column" gap={10}>
      <Flex justifyContent="flex-start" my={20}>
          <Flex w="50%" justifyContent="center">
              <Image borderRadius={"full"} boxShadow="0px 0px 50px 0px #7a6ac3" src={game?.image} w={300} h={300} objectFit="cover" objectPosition="top"/>
          </Flex>
          <Flex flexDirection="column" w="50%">
              <Subheading size={60} text={game?.title} w="fit-content"/>
              <Flex gap={4} alignItems="center">
                <Flex gap={1}>
                    <Box>
                        <Star rating={4.1444892}/>
                    </Box>
                </Flex>  
                <Text>(130  ratings)</Text>
              </Flex>
              <Text fontSize="4xl" fontWeight={800} color="purple.shadowLight" my={4}>${game?.price}</Text>
              <Text fontSize="2xl" my={4} color="whiteAlpha.600" fontWeight={500}>Details</Text>
              <Text fontSize="lg">{game?.description}</Text>
          </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Subheading text="Reviews" size="4xl" w="fit-content"/>
        {
          game?.reviews?.length > 0 ?
          game?.reviews?.map(review => {
            return <ReviewCard review={review}/>
          }):
          <Text fontSize="lg" my={2}>No Reviews Yet😔 Be the first one to review</Text>
        }

        <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text textAlign="center" color="purple.200" fontSize="2xl" my={5} fontWeight="bold">Give Your Review</Text>
        <LandingButton text="Leave a Review"/>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GameDetails