import { Avatar, Flex, Text, useDisclosure } from '@chakra-ui/react'
import LandingButton from './LandingButton';
import UpdateUser from '../subcomponents/UpdateUser';
import { useState } from 'react';

const Dashboardheader = ({userLoggedInData}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isClose, setIsClose] = useState(false); // for ModalCloseButton

  return (
    <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Flex flexDirection="column" gap={1}>
          <Text color="purple.light" className="sub-heading" fontSize="2xl">@{userLoggedInData?.username}</Text>
          <Text fontSize="md" pb={4}>{userLoggedInData?.email}</Text>
          <LandingButton text="Update Profile" onClick={() => {
            onOpen();
            setIsClose(false);
          }}/>
          <UpdateUser isOpen={isOpen} onClose={onClose} isClose={isClose} setIsClose={setIsClose}/>
        </Flex>
        <Avatar src={userLoggedInData?.profilePic} name={userLoggedInData?.name} size="xl" border="5px solid #8757f7" bg="#b0a0fa"/>
    </Flex>
  )
}

export default Dashboardheader