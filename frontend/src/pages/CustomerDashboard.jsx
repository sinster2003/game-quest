import { Box, Flex, Text } from '@chakra-ui/react'
import Dashboardheader from './../components/utils/Dashboardheader';
import LandingButton from './../components/utils/LandingButton';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userAtom, userSelector } from '../atoms/userAtom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToaster from '../hooks/useToaster';

const CustomerDashboard = () => {
  // determines the current state of userSelector data
  const userLoggedInDataLoadable = useRecoilValueLoadable(userSelector); // gets profile
  const userLoggedInData = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const toast = useToaster();
  
  useEffect(() => {
    // if logged out
    if(!userLoggedInData) {
      navigate("/login");
      toast("Error occurred", "Unauthorised to access customer dashboard. Please login as a customer", "error");
    }
    // if user is a owner
    else if(userLoggedInData?.isOwner) {
      navigate("/customer-dashboard");
      toast("Error occurred", "Unauthorised to access customer dashboard. Please login as a customer", "error");
    }
  }, [userLoggedInData]);

  // the userSelector takes time and loads...
  if(userLoggedInDataLoadable.state === "loading") {
    return <Box>Loading...</Box>
  }
  
  // once the userSelector is data is available the state changes...
  return (
    <Flex flexDirection="column" mx={300} mt={10}>
      <Dashboardheader userLoggedInData={userLoggedInDataLoadable.contents}/>
      <Box w="full" h={0.1} bg="purple.shadowLight"></Box>
      <Flex flexDirection="column" mt={8} alignItems="center" gap={4}>
        <Text className="sub-heading" fontSize="2xl" textAlign="center" w="full">Games Purchased</Text>
        {!(userLoggedInDataLoadable.contents?.games?.length) && <Text>No games purchased yet 😔</Text>}
        <LandingButton text="Shop now"/>
        {userLoggedInDataLoadable.contents?.games?.map((game) => {
          return <p>{game?.title}</p>
        })}
      </Flex>
    </Flex>
  )
}

export default CustomerDashboard