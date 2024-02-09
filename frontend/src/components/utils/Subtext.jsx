import { Text } from "@chakra-ui/react"

const Subtext = ({text}) => {
  return (
    <Text fontSize="md" my={6} w={{base: 300, md: 500}} bgGradient={"linear(to-r, white.light, white.dark)"} bgClip="text">
        {text}
    </Text>
  )
}

export default Subtext