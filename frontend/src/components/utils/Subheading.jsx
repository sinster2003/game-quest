import { Text, useMediaQuery } from "@chakra-ui/react"

const Subheading = ({text, size, w}) => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <Text fontSize={size} className="sub-heading" bgGradient={"linear(to-r, white.light, purple.shadowLight)"} bgClip="text" w={w || "full"} textAlign={isMobile && "center"}>
      {text}
    </Text>
  )
}

export default Subheading