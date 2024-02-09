import { Flex, Icon } from "@chakra-ui/react"
import Herobanner from "../components/subcomponents/Landing/Herobanner"
import Herocontent from "../components/subcomponents/Landing/Herocontent"
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import Shadow from "../components/utils/Shadow";

const Landing = () => {
  return (
    <Flex flexDirection="column">
      <Shadow top={0} left={0} blur={200} spread={100} color={"#7a6ac3"}/>
      <Herobanner/>
      <Icon as={MdKeyboardDoubleArrowDown} boxSize={10} alignSelf="center"/>
      <Herocontent/>
    </Flex>
  )
}

export default Landing