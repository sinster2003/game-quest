import Dashboardheader from '../components/utils/Dashboardheader';
import { 
  Box, 
  Flex, 
  Spinner, 
  useDisclosure 
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import LandingButton from './../components/utils/LandingButton';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userAtom, userSelector } from '../atoms/userAtom';
import useToaster from '../hooks/useToaster';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RegisterModal from '../components/subcomponents/RegisterModal';
import UploadModal from '../components/subcomponents/UploadModal';
import SellGameCard from '../components/subcomponents/SellGameCard';
import axios from 'axios';

const OwnerDashboard = () => {
  const userLoggedInDataLoadable = useRecoilValueLoadable(userSelector);
  const userLoggedInData = useRecoilValue(userAtom);
  const [gamesCollection, setGamesCollection] = useState(null);
  const [isShop, setIsShop] = useState(false);
  const toast = useToaster();
  const navigate = useNavigate();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    // if logged out & trying to access the dashboard and not manually logs out
    if(!userLoggedInData) {
      navigate("/login");
      toast("Error occurred", "Unauthorised to access owner dashboard. Please login as a owner", "error");
    }
    // if user is a customer, checked from the recoil backend call
    else if(userLoggedInDataLoadable?.contents?.isOwner === false && !JSON.parse(localStorage.getItem("logged-out"))) {
      navigate("/customer-dashboard");
      toast("Error occurred", "Unauthorised to access owner dashboard. Please login as a owner", "error");
    }

    // when the recoil call gets the games
    if(!gamesCollection) {
      setGamesCollection(userLoggedInDataLoadable?.contents?.shop?.games);
    }

    // when the shop is registered
    if(userLoggedInDataLoadable?.contents?.shop?._id) {
      setIsShop(true);
    }
  }, [userLoggedInDataLoadable, userLoggedInData])

  const handleDelete = async (gameId) => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`/api/v1/owners/delete-game/${gameId}`);
      const result = await response.data;
      toast("Game Deleted Successfully", result?.message, "success");
      setGamesCollection(gamesCollection?.filter(game_id => game_id !== gameId)); // frontend filtering 
      setIsDeleting(false);
    }
    catch (error) {
      console.log(error);
      toast("Error occurred", error?.response?.data?.message || "Something went wrong", "error");
      setIsDeleting(false);
    }
  }

  if(userLoggedInDataLoadable.state === "loading") {
    return <p>Loading...</p>
  }
  
  return (
    <Flex flexDirection="column" mx={300} mt={90}>
      {isDeleting && <Spinner size="lg" position="fixed" top={5} right={5}/>}
      <Dashboardheader userLoggedInData={userLoggedInDataLoadable?.contents}/>
      <Box w="full" h={0.1} bg="purple.shadowLight"></Box>
      <Flex flexDirection="column" mt={8} alignItems="center" gap={4}>
        <Text className="sub-heading" fontSize="2xl" textAlign="center" w="full" mb={3}>Games Sold</Text>
        {gamesCollection?.length === 0 && <Text>No games sold</Text>}
        {!isShop && <LandingButton text="Register Marketplace" onClick={onOpen}/>}
        {isShop && <LandingButton text="Upload Game" onClick={onOpen}/>}
      </Flex>

      {/* Register a marketplace */}
      {!isShop && <RegisterModal isOpen={isOpen} onClose={onClose} setIsShop={setIsShop}/>}

      {/*upload a game*/}
      {isShop && <UploadModal isOpen={isOpen} onClose={onClose} setGamesCollection={setGamesCollection}/>}

      {/* display selling games */}
      <Flex flexWrap="wrap" my={10} gap={10} justifyContent="center">
      {gamesCollection?.map(game => {
        return <SellGameCard key={game} game_id={game} handleDelete={() => handleDelete(game)}/>
      })}
      </Flex>
    </Flex>
  )
}

export default OwnerDashboard;