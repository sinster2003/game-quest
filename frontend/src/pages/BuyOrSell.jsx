import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const BuyOrSell = () => {
  return (
    <Flex gap={20} position="relative" justifyContent="center" alignItems="center" minH="75vh">
      <Flex
        h={300}
        w={300}
        className="buyorsell-card"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        borderRadius={10}
        cursor="pointer"
        _hover={{boxShadow: "0px 0px 100px 10px #7a6ac3 inset"}}
      >
        <Text
          className="sub-heading"
          fontSize="4xl"
          bgGradient={"linear(to-r, white.light, white.dark)"}
          bgClip="text"
        >
          Buy
        </Text>
      </Flex>
      <Flex
        h={300}
        w={300}
        className="buyorsell-card"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        borderRadius={10}
        cursor="pointer"
        _hover={{boxShadow: "0px 0px 100px 10px #7a6ac3 inset"}}
      >
        <Text
          className="sub-heading"
          fontSize="4xl"
          bgGradient={"linear(to-r, white.light, white.dark)"}
          bgClip="text"
        >
          Sell
        </Text>
      </Flex>
    </Flex>
  );
};

export default BuyOrSell;
