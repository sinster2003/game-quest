import Dashboardheader from '../components/utils/Dashboardheader';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import LandingButton from './../components/utils/LandingButton';

const OwnerDashboard = () => {
  return (
    <Flex flexDirection="column" mx={300} mt={10}>
      <Dashboardheader />
      <Box w="full" h={0.1} bg="purple.shadowLight"></Box>
      <Flex flexDirection="column" mt={8} alignItems="center" gap={4}>
        <Text className="sub-heading" fontSize="2xl" textAlign="center" w="full" mb={3}>Games Sold</Text>
        <Text>No games sold</Text>
        <LandingButton text="Register Marketplace"/>
      </Flex>
    </Flex>
  )
}

export default OwnerDashboard;