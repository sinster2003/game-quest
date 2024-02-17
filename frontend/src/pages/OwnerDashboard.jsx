import Dashboardheader from '../components/utils/Dashboardheader';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import LandingButton from './../components/utils/LandingButton';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userAtom, userSelector } from '../atoms/userAtom';
import useToaster from '../hooks/useToaster';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const OwnerDashboard = () => {
  const userLoggedInDataLoadable = useRecoilValueLoadable(userSelector);
  const userLoggedInData = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const toast = useToaster();
  
  useEffect(() => {
    // if logged out
    if(!userLoggedInData) {
      navigate("/login");
      toast("Error occurred", "Unauthorised to access owner dashboard. Please login as a owner", "error");
    }
    // if user is a customer
    else if(!(userLoggedInData?.isOwner)) {
      navigate("/owner-dashboard");
      toast("Error occurred", "Unauthorised to access owner dashboard. Please login as a owner", "error");
    }
  }, [])

  if(userLoggedInDataLoadable.state === "loading") {
    return <p>Loading...</p>
  }
  
  return (
    <Flex flexDirection="column" mx={300} mt={10}>
      <Dashboardheader userLoggedInData={userLoggedInDataLoadable.contents}/>
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