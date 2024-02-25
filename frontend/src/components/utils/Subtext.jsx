import { Text } from "@chakra-ui/react"

const Subtext = ({text, margin, center, size, weight}) => {
  return (
    <Text fontSize={size ? size : "md"} my={margin ? margin : 6} textAlign={center} w={{base: 300, md: 500}} bgGradient={"linear(to-r, white.light, white.dark)"} bgClip="text" fontWeight={weight && weight}>
      {text}
    </Text>
  )
}

export default Subtext