import {
  Flex,
  Heading,
  Icon,
  IconButton,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FiShoppingCart } from "react-icons/fi";
import LandingButton from "../utils/LandingButton";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../../atoms/userAtom";
import axios from "axios";
import useToaster from "../../hooks/useToaster";

const NavBar = () => {
  const [userLoggedInData, setUserLoggedInData] = useRecoilState(userAtom);
  const toast = useToaster();
  const navigate = useNavigate();

  console.log(userLoggedInData);

  const handleLogout = async () => {
    try{
      const role = userLoggedInData.isOwner ? "owners": "customers";
      const response = await axios.post(`/api/v1/${role}/logout`);
      const result = await response.data;
      toast("Successful Logout", `${result?.message}`, "success");
      localStorage.removeItem("user");
      setUserLoggedInData(null);
      navigate("/");
    }
    catch(error) {
      toast("Unsuccessful Logout", `${result?.message}`, "error");
    }
  }

  console.log(userLoggedInData);

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
        <ListItem cursor="pointer" _hover={{ color: "purple.banner" }}>
          Games
        </ListItem>
        <ListItem cursor="pointer" _hover={{ color: "purple.banner" }}>
          Trending
        </ListItem>
        <ListItem cursor="pointer" _hover={{ color: "purple.banner" }}>
          Popular
        </ListItem>
      </UnorderedList>
      <Flex alignItems="center" justifyContent="flex-end" gap={7} w={250}>
        <Icon as={FiShoppingCart} color="purple.banner" cursor="pointer" boxSize={5}/>
        <IconButton rounded={"full"} variant="ghost">
          <SearchIcon color="white.light" cursor="pointer" />
        </IconButton>
        {!(userLoggedInData) && <Link to="/login"><LandingButton text="Log in"/></Link>}
        {userLoggedInData && <LandingButton text="Log out" onClick={handleLogout}/>}
      </Flex>
    </Flex>
  );
};

export default NavBar;
