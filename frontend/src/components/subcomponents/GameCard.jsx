import { Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import cartAtom from '../../atoms/cartAtom';
import showCartAtom from '../../atoms/showCartAtom';
import useToaster from '../../hooks/useToaster';
import { Link } from 'react-router-dom';

const GameCard = ({game}) => {
  const [cartItems, setCartItems] = useRecoilState(cartAtom);
  const setShowCart = useSetRecoilState(showCartAtom);
  const toast = useToaster();

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

  return (
    <Link to={`/game-details/${game._id}`}>
    <Flex flexDirection="column" bg="purple.500" pb={4} mt={1} position="relative">
      <Image src={game?.image || "/GTAV.png"} alt={game?.title} h={300} w={300} objectFit="cover" objectPosition="top"/>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" my={4}>
        <Text fontSize="xl" color="purple.900" textAlign="center" className="sub-heading">{game?.title?.length > 10 ? `${game?.title}...`: game?.title}</Text>
        <Text fontSize="lg" color="purple.bg" fontWeight={700} textAlign="center">${game?.price}</Text>
      </Flex>
      <Flex justifyContent="center" gap={4}>
        <Button bg="purple.200" color="purple.bg" _hover={{}} _focus={{}} _active={{}} onClick={handleAddToCart}>Add to Cart</Button>
        <Button bg="purple.bg" color="white.light" _hover={{}} _focus={{}} _active={{}} onClick={(e) => {
          handleAddToCart(e, true);
          setShowCart(true);
        }}>Buy Now</Button>
      </Flex>
    </Flex>
    </Link>
  )
}

export default GameCard