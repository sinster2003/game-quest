import { Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import BuyOrSellCard from './../components/utils/BuyOrSellCard';
import { Link } from "react-router-dom";

const BuyOrSell = () => {
  const [isMobileOrTab] = useMediaQuery("(max-width: 900px)");

  return (
    <Flex flexDirection={isMobileOrTab ? "column" : "row"} gap={isMobileOrTab ? 10 : 20} position="relative" justifyContent="center" alignItems="center" minH="75vh" my={isMobileOrTab && 10}>
      <Link to="/signup?role=customer"><BuyOrSellCard text="Buy Games"/></Link>
      <Link to="/signup?role=owner"><BuyOrSellCard text="Sell Games"/></Link>
    </Flex>
  );
};

export default BuyOrSell;
