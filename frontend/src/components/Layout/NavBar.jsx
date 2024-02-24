import {
  Avatar,
  Flex,
  Heading,
  Icon,
  ListItem,
  Text,
  UnorderedList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userAtom, userSelector } from "../../atoms/userAtom";
import LandingButton from "../utils/LandingButton";
import axios from "axios";
import useToaster from "../../hooks/useToaster";
import cartAtom from "../../atoms/cartAtom";
import CartCard from "../subcomponents/CartCard";
import showCartAtom from "../../atoms/showCartAtom";

const NavBar = () => {
  const [userLoggedInData, setUserLoggedInData] = useRecoilState(userAtom);
  const userLoggedInDataLoadable = useRecoilValueLoadable(userSelector);
  const toast = useToaster();
  const navigate = useNavigate();
  const cartItems = useRecoilValue(cartAtom);
  const [showCart, setShowCart] = useRecoilState(showCartAtom);

  // memoizing the total price
  const handlePrice = useMemo(() => {
    console.log(cartItems);
    const totalPrice = cartItems?.reduce((totalPrice, cart) => {
      return totalPrice + cart?.price
    }, 0);
    return totalPrice;
  }, [cartItems]);

  const handleLogout = async () => {
    try{
      const role = userLoggedInDataLoadable.isOwner ? "owners": "customers";
      const response = await axios.post(`/api/v1/${role}/logout`);
      const result = await response.data;
      toast("Successful Logout", `${result?.message}`, "success");
      localStorage.removeItem("user");
      localStorage.setItem("logged-out", JSON.stringify(true));
      setUserLoggedInData(null);
      navigate("/");
    }
    catch(error) {
      toast("Unsuccessful Logout", `${result?.message}`, "error");
    }
  }

  if(userLoggedInDataLoadable.state === "loading") {
    return <p>Loading...</p>
  }

  return (
    <Flex mt={4} alignItems="center" justifyContent="space-between">
      <Link to="/">
      <Heading
        color="purple.light"
        className="heading"
        fontSize="6xl"
        textAlign={{ base: "center", sm: "left" }}
        w={250}
      >
        Game<span style={{ color: "#dde3fd" }}>Quest</span>
      </Heading>
      </Link>
      <UnorderedList
        m={0}
        listStyleType="none"
        display="flex"
        gap={20}
        fontSize={{ base: "sm", md: "md" }}
      >
        <Link to="/shop-now">
          <ListItem cursor="pointer" _hover={{ color: "purple.banner" }}>
            Games
          </ListItem>
        </Link>
        <ListItem cursor="pointer" _hover={{ color: "purple.banner" }}>
          Trending
        </ListItem>
        <ListItem cursor="pointer" _hover={{ color: "purple.banner" }}>
          Popular
        </ListItem>
      </UnorderedList>
      <Flex alignItems="center" justifyContent="flex-end" gap={8} w={250}>
        <Link to={userLoggedInDataLoadable?.contents?.isOwner ? `/owner-dashboard` : `/customer-dashboard`}>
          <Avatar src={userLoggedInData?.profilePic} size="sm"/>
        </Link>
        <Flex alignItems="center" position="relative">
          <Flex bg="purple.500" color="white.light" p={2.5} borderRadius="50%" w={2} h={2} justifyContent="center" alignItems="center" position="absolute" top={-3} left={3}>
            <Text fontSize="xs" fontWeight="bold">{cartItems?.length || 0}</Text>
          </Flex>
          <Icon as={FiShoppingCart} color="purple.banner" cursor="pointer" boxSize={5} onClick={() => setShowCart(true)}/>
        </Flex>
        {!(userLoggedInData) && <Link to="/login"><LandingButton text="Log in"/></Link>}
        {userLoggedInData && <LandingButton text="Log out" onClick={handleLogout}/>}
      </Flex>
      
      {/* cart */}
      <Modal isOpen={showCart} scrollBehavior="inside">
        <ModalOverlay/>
        <ModalContent bg="purple.bg" minH="75vh">
          <ModalHeader>
            Cart
          </ModalHeader>
          <ModalCloseButton onClick={() => setShowCart(false)}/>
          <ModalBody>
            {
              cartItems?.length === 0 && <Flex flexDirection="column" justifyContent="center" alignItems="center" gap={5}>
                <Text fontSize="lg">No Games in the cart</Text>
                <LandingButton text="Go Shopping" onClick={() => {
                  setShowCart(false);
                  navigate("/shop-now")
                }}/>
              </Flex>
            }
            <Flex flexDirection="column" gap={4}>
              {
                cartItems?.map(cart => {
                  return <CartCard key={cart._id} game={cart}/>
                }) 
              }
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Flex justifyContent="space-between" alignItems="center" gap={5}>
              <Text fontSize="lg" color="whiteAlpha.700">Total: </Text>
              <Text fontSize="lg" fontWeight="bold" color="purple.shadowLight">${handlePrice}</Text>
            </Flex>
            <LandingButton text="Checkout" isDisabled={cartItems?.length === 0 && true}/>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default NavBar;
