import { Avatar, Flex, Text } from '@chakra-ui/react'
import LandingButton from './LandingButton';

const Dashboardheader = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Flex flexDirection="column" gap={1}>
          <Text color="purple.light" className="sub-heading" fontSize="2xl">@sinster2003</Text>
          <Text fontSize="md" pb={4}>sindhurvshabaraya2318@gmail.com</Text>
          <LandingButton text="Update Profile"/>
        </Flex>
        <Avatar name="Customer" size="xl" border="5px solid #8daece"/>
    </Flex>
  )
}

export default Dashboardheader