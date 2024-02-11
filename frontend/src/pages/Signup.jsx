import { Flex, Input, Text } from "@chakra-ui/react";
import Subheading from './../components/utils/Subheading';
import Subtext from "../components/utils/Subtext";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Flex flexDirection="column" alignItems="center" mt={10}>
      <Subheading text="Join the community" size="4xl"/>
      <Subtext text="Be part of a adventurous gaming universe in our easy-to-use platform" margin={2}/>
      <Text mt={2} mb={8}>Already a member? <Link to="/login">Login</Link></Text>
      <Flex flexDirection="column" gap={6} w={{base: 300, md: 400}}>
        <Input placeholder="Enter Your Full Name" variant="filled" focusBorderColor="purple.shadowLight"/>
        <Input placeholder="Enter Username" variant="filled" focusBorderColor="purple.shadowLight"/>
        <Input placeholder="Enter Your Email" variant="filled" focusBorderColor="purple.shadowLight"/>
        <Input placeholder="Enter Password" variant="filled" focusBorderColor="purple.shadowLight"/>
        <Input placeholder="Confirm Password" variant="filled" focusBorderColor="purple.shadowLight"/>
      </Flex>
    </Flex>
  )
}

export default Signup