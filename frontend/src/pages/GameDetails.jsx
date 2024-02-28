import { Box, Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Subheading from '../components/utils/Subheading';
import ReviewCard from '../components/subcomponents/ReviewCard';
import LandingButton from '../components/utils/LandingButton';
import Star from '../components/subcomponents/Star';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import showCartAtom from '../atoms/showCartAtom';
import cartAtom from '../atoms/cartAtom';
import useToaster from '../hooks/useToaster';
import { userAtom, userSelector } from '../atoms/userAtom';
import ratingCountAtom from '../atoms/ratingCountAtom';

const maxCharacters = 200;

const GameDetails = () => {
  const {id} = useParams();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [cartItems, setCartItems] = useRecoilState(cartAtom);
  const setShowCart = useSetRecoilState(showCartAtom);
  const toast = useToaster();
  const navigate = useNavigate();
  const userLoggedInData = useRecoilValue(userAtom);
  const userLoggedInDataLoadable = useRecoilValueLoadable(userSelector);
  const ratingCount = useRecoilValue(ratingCountAtom);
  const {onOpen, isOpen, onClose} = useDisclosure();
  const [value, setValue] = useState("");
  const [remaining, setRemaining] = useState(maxCharacters);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if(!userLoggedInData) { // not logged in
      navigate("/login");
      toast("Login", "Please login to shop the games", "error");
    }
    else if(userLoggedInDataLoadable?.contents?.isOwner && !JSON.parse(localStorage.getItem("logged-out"))) { // is a owner
      navigate("/owner-dashboard");
      toast("Denied Access", "Please login as a customer", "error");
    }

    // game to be fetched
    const getGame = async () => {
      try{
        const response = await axios.get(`/api/v1/customers/get-game-details/${id}`);
        const result = await response.data;
        console.log(result);
        setGame(result);
        setReviews(result?.reviews);
      }
      catch(error) {
        console.log(error)
      }
    }
    
    getGame();
  }, [id, userLoggedInData, userLoggedInDataLoadable]);

  const handleAddToCart = (e, buy) => {
    e.preventDefault();
    const isGameInCart = cartItems.find(cartItem => cartItem._id === game._id);
    if(!isGameInCart) {
      setCartItems(cartItems?.concat(game));
      localStorage.setItem("cart", JSON.stringify(cartItems?.concat(game)));
      toast("Successful Addition", `${game.title} added into the cart`, "success")
      if(buy) { // if buy now is clicked
        setShowCart(true);
      }
    }
    else {
      if(!buy) {
        toast("Already in the cart", `${game.title} is present in the cart`, "error");
      }
    }
  }

  const handleReview = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/v1/customers/review-game/${game._id}`, {
        review: value
      });
      const result = await response.data;
      toast('Success', result?.message, 'success');
      setReviews(reviews?.concat(result?.review));
      setValue("");
      onClose();
      setLoading(false);
    }
    catch(error) {
      console.log(error);
      toast('Error', error?.response?.data?.message || error?.response?.data?.error, 'error');
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    if(e.target.value.length <= maxCharacters) {
      setValue(e.target.value);
      setRemaining(maxCharacters - e.target.value.length);
    }
  }

  if(userLoggedInDataLoadable?.state === "loading" || !game) {
    return <p>Loading...</p>
  }

  return (
    <Flex flexDirection="column" gap={10} position="relative">
      {loading && <Spinner size="lg" position="fixed" top={5} right={5}/>}
      <Flex justifyContent="flex-start" my={20}>
          <Flex w="50%" justifyContent="center">
              <Image borderRadius={"full"} boxShadow="0px 0px 50px 0px #7a6ac3" src={game?.image} w={300} h={300} objectFit="cover" objectPosition="top"/>
          </Flex>
          <Flex flexDirection="column" w="50%">
              <Subheading size={60} text={game?.title} w="fit-content"/>
              <Flex gap={4} alignItems="center">
                <Star gameId={game?._id}/>
                <Text>({ratingCount} ratings)</Text>
              </Flex>
              <Text fontSize="4xl" fontWeight={800} color="purple.shadowLight" my={4}>${game?.price}</Text>
              <Flex gap={3}>
                <Button bg="purple.200" w={150} color="purple.bg" _hover={{bg: "purple.100"}} _focus={{}} _active={{}} onClick={handleAddToCart}>Add to Cart</Button>
                <Button bg="purple.700" w={150} color="white.light" _hover={{bg: "purple.800"}} _focus={{}} _active={{}} onClick={(e) => {
                  handleAddToCart(e, true);
                  setShowCart(true);
                }}>Buy Now</Button>
              </Flex>
              <Text fontSize="2xl" mb={2} mt={6} color="whiteAlpha.600" fontWeight={500}>Details</Text>
              <Text fontSize="lg">{game?.description}</Text>
          </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Subheading text="Reviews" size="4xl" w="fit-content"/>
        {
          reviews?.length > 0 ?
          reviews?.map(review => {
            return <ReviewCard key={review._id} review={review}/>
          }):
          <Text fontSize="lg" my={2}>No Reviews Yet😔 Be the first one to review</Text>
        }
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text textAlign="center" color="purple.200" fontSize="2xl" my={5} fontWeight="bold">Give Your Review</Text>
        <LandingButton text="Leave a Review" onClick={() => onOpen()}/>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent bg="purple.bg">
            <ModalCloseButton onClick={() => setValue("")}/>
            <ModalHeader>
              <Subheading text="Review"/>
            </ModalHeader>
            <ModalBody>
              <Textarea placeholder="Write your review" focusBorderColor="purple.shadowLight" borderColor="purple.shadowLight" _hover={{}} value={value} onChange={handleChange}/>
              <Text textAlign="end" my={2}>{remaining}/200</Text>
            </ModalBody>
            <ModalFooter>
              <LandingButton text="Add review" onClick={handleReview}/>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GameDetails