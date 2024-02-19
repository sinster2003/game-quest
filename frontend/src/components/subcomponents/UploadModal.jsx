import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import LandingButton from "../utils/LandingButton";
import ModalInput from "../utils/ModalInput";
import { useState } from "react";
import axios from "axios";
import useToaster from "../../hooks/useToaster";
import { useRecoilState } from "recoil";
import { userAtom } from "../../atoms/userAtom";

const UploadModal = ({isOpen, onClose}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const toast = useToaster();
  const [userLoggedInData, setUserLoggedInData] = useRecoilState(userAtom);

  const handleUpload = async () => {
    try {
      if(isNaN(parseInt(price))) {
        toast("Error occurred", "Price has to be a number", "error");
        throw new Error();
      }

      const response = await axios.post(`/api/v1/owners/upload-game`, {
        title, 
        description,
        price: parseInt(price),
        image:"Some Image"
      });
      const result = await response.data;
      toast("Game uploaded successfully", result?.message, "success");
      setUserLoggedInData({...userLoggedInData, games: result?.games});
      setTitle("");
      setDescription("");
      setPrice("");
      onClose();
    }
    catch(error) {
      console.log(error)
      toast("Error occurred", "Unsuccessful game upload", "error");
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="purple.bg">
        <ModalHeader>Upload the game to be sold</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ModalInput value={title} setValue={setTitle} placeholder="Enter the title of the game"/>
          <ModalInput value={description} setValue={setDescription} placeholder="Enter the description of the game"/>
          <ModalInput value={price} setValue={setPrice} placeholder="Enter the price of the game"/>
          <Input type="file" accept="image/*" hidden />
          <LandingButton my={2} text="Add an image" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={() => onClose()}>
            Close
          </Button>
          <Button colorScheme="purple" onClick={handleUpload}>Upload</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
