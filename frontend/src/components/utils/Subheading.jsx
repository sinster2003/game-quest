import { Text } from "@chakra-ui/react"

const Subheading = ({text, size}) => {
  return (
    <Text fontSize={size} className="sub-heading" bgGradient={"linear(to-r, white.light, purple.shadowLight)"} bgClip="text">
      {text}
    </Text>
  )
}

export default Subheading