import {
  Avatar,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Subheading from "../utils/Subheading";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { userAtom, userSelector } from "../../atoms/userAtom";
import LandingButton from "../utils/LandingButton";
import useImageRenderer from './../../hooks/useImageRenderer';
import axios from "axios";
import useToaster from "../../hooks/useToaster";
import { useNavigate } from "react-router-dom";

const UpdateUser = ({ isOpen, onClose, isClose, setIsClose}) => {
  const userLoggedInDataLoadable = useRecoilValueLoadable(userSelector);
  const setUserLoggedInData = useSetRecoilState(userAtom);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputElement = useRef(null);
  const {image, setImage, readImage} = useImageRenderer();
  const toast = useToaster();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setName(userLoggedInDataLoadable?.contents?.name);
    setUsername(userLoggedInDataLoadable?.contents?.username);
    setEmail(userLoggedInDataLoadable?.contents?.email);
    setImage(userLoggedInDataLoadable?.contents?.profilePic);
  }, [userLoggedInDataLoadable, isClose]);

  const handleUpdate = async () => {
    try{
        setIsUpdating(true);
        const response = await axios.put(`/api/v1/${userLoggedInDataLoadable?.contents?.isOwner ? "owners" : "customers"}/update-profile`, {
            profilePic: image,
            name,
            username,
            email,
            password
        });
        const result = await response.data;
        toast("Successful profile updation", result?.message, "success");
        navigate(`/${userLoggedInDataLoadable?.contents?.isOwner ? "owner" : "customer"}-dashboard`);
        onClose();
        setIsClose(true);
        setUserLoggedInData({userId: result?.id, isOwner: result?.isOwner});
        setIsUpdating(false);
    }
    catch(error) {
        console.log(error);
        toast("Error occured", error?.response?.data?.message, "error");
        setIsUpdating(false);
    }
  }

  if(userLoggedInDataLoadable.state === "loading") {
    return <p>Loading...</p>
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="purple.bg">
        <ModalHeader>
          <Subheading text="Update Profile" />
        </ModalHeader>
        <ModalCloseButton isDisabled={isUpdating} onClick={() => {
            setIsClose(true);
            onClose();
        }} />
        <ModalBody>
          <Flex gap={6} flexDirection="column">
            <Flex justifyContent="space-around" _hover={{}} alignItems="center">
              <Avatar
                size="xl"
                src={image}
                alt={userLoggedInDataLoadable?.contents?.name}
              />
              <LandingButton text="Change Profile Pic" onClick={() => inputElement?.current?.click()}/>
              <Input type="file" accept="image/*" hidden ref={inputElement} onChange={readImage}/>
            </Flex>
            <Flex gap={6} flexDirection="column">
              <Input
                focusBorderColor="purple.shadowLight"
                border="2px solid"
                borderColor="purple.shadowLight"
                value={name}
                placeholder="Enter your name"
                _hover={{}}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                focusBorderColor="purple.shadowLight"
                border="2px solid"
                borderColor="purple.shadowLight"
                value={username}
                placeholder="Enter your username"
                _hover={{}}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                focusBorderColor="purple.shadowLight"
                border="2px solid"
                borderColor="purple.shadowLight"
                value={email}
                placeholder="Enter your email"
                _hover={{}}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                focusBorderColor="purple.shadowLight"
                border="2px solid"
                borderColor="purple.shadowLight"
                value={password}
                placeholder="Enter your password"
                _hover={{}}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <LandingButton isLoading={isUpdating} text="Update Profile" onClick={handleUpdate}/>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUser;
