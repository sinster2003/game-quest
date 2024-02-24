import {
  Button,
  Image,
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
import { useRef, useState } from "react";
import axios from "axios";
import useToaster from "../../hooks/useToaster";
import useImageRenderer from './../../hooks/useImageRenderer';

const UploadModal = ({isOpen, onClose, setGamesCollection}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const toast = useToaster();
  const {readImage, image, setImage} = useImageRenderer();
  const [loading, setLoading] = useState(false);
  const inputElement = useRef();

  const handleUpload = async () => {
    try {
      setLoading(true);
      if(isNaN(parseInt(price))) {
        toast("Error occurred", "Price has to be a number", "error");
        throw new Error();
      }

      const response = await axios.post(`/api/v1/owners/upload-game`, {
        title, 
        description,
        price: parseInt(price),
        image
      });
      const result = await response.data;
      toast("Game uploaded successfully", result?.message, "success");
      setGamesCollection(prevGames => prevGames?.concat(result?.gameId));
      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
      inputElement.current.value = "";
      setLoading(false);
      onClose();
    }
    catch(error) {
      console.log(error)
      toast("Error occurred", "Unsuccessful game upload", "error");
    }
  }

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setImage("");
    inputElement.current.value=""; // setting the file input empty
    onClose();
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
          <Input ref={inputElement} type="file" accept="image/*" hidden onChange={readImage}/>
          <LandingButton my={2} text="Add an image" onClick={() => inputElement.current.click()}/>
          {image && <Image src={image} h={400} w={400} mt={5} alt="Uploaded Image"/>}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleClose} isDisabled={loading}>
            Close
          </Button>
          <Button colorScheme="purple" onClick={handleUpload} isLoading={loading}>Upload</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
