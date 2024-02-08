import { Box } from "@chakra-ui/react"

const Shadow = ({top, left, blur, spread, color}) => {
  return (
    <Box zIndex="-1" position="absolute" top={top} left={left} w="1px" h="1px" boxShadow={`0px 0px ${blur}px ${spread}px ${color}`}/>
  )
}

export default Shadow