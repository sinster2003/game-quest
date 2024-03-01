import { Text, useMediaQuery } from "@chakra-ui/react"

const Subtext = ({text, margin, center, size, weight}) => {
  const [isMobileOrTab] = useMediaQuery('(max-width: 900px)');

  return (
    <Text fontSize={size ? size : "md"} my={margin ? margin : 6} textAlign={isMobileOrTab && "center" || center && center} w={{base: 300, md: 500}} bgGradient={"linear(to-r, white.light, white.dark)"} bgClip="text" fontWeight={weight && weight}>
      {text}
    </Text>
  )
}

export default Subtext