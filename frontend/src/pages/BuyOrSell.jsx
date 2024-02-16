import { Flex } from "@chakra-ui/react";
import React from "react";
import BuyOrSellCard from './../components/utils/BuyOrSellCard';

const BuyOrSell = () => {
  return (
    <Flex gap={20} position="relative" justifyContent="center" alignItems="center" minH="75vh">
      <BuyOrSellCard text="Buy"/>
      <BuyOrSellCard text="Sell"/>
    </Flex>
  );
};

export default BuyOrSell;
