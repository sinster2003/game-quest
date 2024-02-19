import Dashboardheader from '../components/utils/Dashboardheader';
import { 
  Box, 
  Flex, 
  useDisclosure 
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import LandingButton from './../components/utils/LandingButton';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userAtom, userSelector } from '../atoms/userAtom';
import useToaster from '../hooks/useToaster';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import RegisterModal from '../components/subcomponents/RegisterModal';
import UploadModal from '../components/subcomponents/UploadModal';
import SellGameCard from '../components/subcomponents/SellGameCard';

const OwnerDashboard = () => {
  const userLoggedInDataLoadable = useRecoilValueLoadable(userSelector);
  const userLoggedInData = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const toast = useToaster();
  const {isOpen, onOpen, onClose} = useDisclosure();
  
  useEffect(() => {
    // if logged out & trying to access the dashboard and not manually logs out
    if(!userLoggedInData) {
      navigate("/login");
      toast("Error occurred", "Unauthorised to access owner dashboard. Please login as a owner", "error");
    }
    // if user is a customer, checked from the recoil backend call
    else if(userLoggedInDataLoadable?.contents?.isOwner === false  && !JSON.parse(localStorage.getItem("logged-out"))) {
      navigate("/customer-dashboard");
      toast("Error occurred", "Unauthorised to access owner dashboard. Please login as a owner", "error");
    }
  }, [userLoggedInDataLoadable, userLoggedInData])

  if(userLoggedInDataLoadable.state === "loading") {
    return <p>Loading...</p>
  }
  
  return (
    <Flex flexDirection="column" mx={300} mt={90}>
      <Dashboardheader userLoggedInData={userLoggedInDataLoadable?.contents}/>
      <Box w="full" h={0.1} bg="purple.shadowLight"></Box>
      <Flex flexDirection="column" mt={8} alignItems="center" gap={4}>
        <Text className="sub-heading" fontSize="2xl" textAlign="center" w="full" mb={3}>Games Sold</Text>
        {userLoggedInDataLoadable?.contents?.shop?.games?.length === 0 && <Text>No games sold</Text>}
        {!userLoggedInDataLoadable?.contents?.shop?._id && <LandingButton text="Register Marketplace" onClick={onOpen}/>}
        {userLoggedInDataLoadable?.contents?.shop?._id && <LandingButton text="Upload Game" onClick={onOpen}/>}
      </Flex>

      {/* Register a marketplace */}
      {(!userLoggedInDataLoadable?.contents?.shop?._id) && <RegisterModal isOpen={isOpen} onClose={onClose}/>}

      {/*upload a game*/}
      {(userLoggedInDataLoadable?.contents?.shop?._id) && <UploadModal isOpen={isOpen} onClose={onClose}/>}

      {/* display selling games */}
      <Flex flexWrap="wrap" my={10} gap={10} justifyContent="center">
      {userLoggedInDataLoadable?.contents?.shop?.games?.map(game => {
        return <SellGameCard key={game} game_id={game}/>
      })}
      </Flex>
    </Flex>
  )
}

export default OwnerDashboard;