import { Flex, Text } from '@chakra-ui/react'

const BuyOrSellCard = ({text}) => {
  return (
    <Flex
        h={300}
        w={300}
        className="buyorsell-card"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        borderRadius={10}
        cursor="pointer"
        _hover={{
            boxShadow: "0px 0px 100px 10px #7a6ac3 inset",
        }}
      >
        <Text
          className="sub-heading"
          fontSize="4xl"
          bgGradient={"linear(to-r, white.light, white.dark)"}
          bgClip="text"
        >
          {text}
        </Text>
      </Flex>
  )
}

export default BuyOrSellCard