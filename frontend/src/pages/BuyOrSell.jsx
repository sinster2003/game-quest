import { Flex } from "@chakra-ui/react";
import React from "react";
import BuyOrSellCard from './../components/utils/BuyOrSellCard';
import { Link } from "react-router-dom";

const BuyOrSell = () => {
  return (
    <Flex gap={20} position="relative" justifyContent="center" alignItems="center" minH="75vh">
      <Link to="/signup?role=customer"><BuyOrSellCard text="Buy Games"/></Link>
      <Link to="/signup?role=owner"><BuyOrSellCard text="Sell Games"/></Link>
    </Flex>
  );
};

export default BuyOrSell;
