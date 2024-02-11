import { Flex, Input, Select, Text } from "@chakra-ui/react";
import Subheading from './../components/utils/Subheading';
import Subtext from "../components/utils/Subtext";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Flex flexDirection="column" alignItems="center" mt={10}>
      <Subheading text="Welcome Back" size="4xl"/>
      <Subtext text="Delve into the adventurous gaming universe in our easy-to-use platform" margin={2} center="center"/>
      <Text mt={2} mb={8}>New To GameQuest? <Link to="/signup">Sign Up</Link></Text>
      <Flex flexDirection="column" gap={6} w={{base: 300, md: 400}}>
        <Input placeholder="Enter Username" variant="filled" focusBorderColor="purple.shadowLight"/>
        <Input placeholder="Enter Password" variant="filled" focusBorderColor="purple.shadowLight"/>
        <Select variant="filled" focusBorderColor="purple.shadowLight">
          <option>
            Customer
          </option>
          <option>
            Owner
          </option>
        </Select>
      </Flex>
    </Flex>
  )
}

export default Login