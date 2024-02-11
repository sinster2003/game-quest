import { Text } from "@chakra-ui/react"

const Subtext = ({text, margin, center}) => {
  return (
    <Text fontSize="md" my={margin || 6} textAlign={center} w={{base: 300, md: 500}} bgGradient={"linear(to-r, white.light, white.dark)"} bgClip="text">
        {text}
    </Text>
  )
}

export default Subtext