import { Text } from "@chakra-ui/react"

const Subheading = ({text, size, w}) => {
  return (
    <Text fontSize={size} className="sub-heading" bgGradient={"linear(to-r, white.light, purple.shadowLight)"} bgClip="text" w={w || "full"}>
      {text}
    </Text>
  )
}

export default Subheading