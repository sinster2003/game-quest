import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FiShoppingCart } from "react-icons/fi";

const NavBar = () => {
  return (
    <Flex mt={4} alignItems="center" justifyContent="space-between">
      <Heading
        color="purple.light"
        className="heading"
        fontSize="6xl"
        textAlign={{ base: "center", sm: "left" }}
      >
        Game<span style={{ color: "#dde3fd" }}>Quest</span>
      </Heading>
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
      <Flex alignItems="center" gap={6}>
        <Icon as={FiShoppingCart} color="purple.banner" cursor="pointer" boxSize={5}/>
        <IconButton rounded={"full"} variant="ghost">
          <SearchIcon color="white.light" cursor="pointer" />
        </IconButton>
        <Button
          bgGradient={"linear(to-r, purple.buttonLeft, purple.buttonRight)"}
          _hover={{ boxShadow: '0px 0px 10px 5px #7a6ac3'}}
          _active={{}}
          _focus={{}}
        >
          Sign up
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
