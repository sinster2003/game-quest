import { Box, Flex, Text } from '@chakra-ui/react'
import Dashboardheader from './../components/utils/Dashboardheader';
import LandingButton from './../components/utils/LandingButton';

const CustomerDashboard = () => {
  return (
    <Flex flexDirection="column" mx={300} mt={10}>
      <Dashboardheader/>
      <Box w="full" h={0.1} bg="purple.shadowLight"></Box>
      <Flex flexDirection="column" mt={8} alignItems="center" gap={4}>
        <Text className="sub-heading" fontSize="2xl" textAlign="center" w="full" mb={3}>Games Purchased</Text>
        <Text>No games purchased yet 😔</Text>
        <LandingButton text="Shop now"/>
      </Flex>
    </Flex>
  )
}

export default CustomerDashboard