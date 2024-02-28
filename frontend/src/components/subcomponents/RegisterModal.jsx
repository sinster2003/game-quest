import { useRef, useState } from "react";
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
import axios from "axios";
import useToaster from "../../hooks/useToaster";
import ModalInput from "../utils/ModalInput";
import useImageRenderer from "../../hooks/useImageRenderer";

const RegisterModal = ({ isOpen, onClose, setIsShop }) => {
  const [shopName, setShopName] = useState("");
  const [shopLocation, setShopLocation] = useState("");
  const {image, setImage, readImage} = useImageRenderer();
  const inputElement = useRef(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const toast = useToaster();

  const handleRegistration = async () => {
    try {
      setIsRegistering(true);
      const response = await axios.post(`/api/v1/owners/register-marketplace`, {
        name: shopName,
        location: shopLocation,
        logo: image,
      });
      const result = await response.data;
      toast("Registration successful", result?.message, "success");
      setIsShop(true);
      setShopName("");
      setShopLocation("");
      onClose();
      setIsRegistering(false);
    } catch (error) {
      console.log(error);
      toast(
        "Error occurred",
        "Registration of the marketplace was unsuccessful",
        "error"
      );
      setIsRegistering(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="purple.bg">
        <ModalHeader>Register Your Digital Marketplace</ModalHeader>
        <ModalCloseButton isDisabled={isRegistering}/>
        <ModalBody>
          <ModalInput value={shopName} setValue={setShopName} placeholder="Enter the name of the marketplace"/>
          <ModalInput value={shopLocation} setValue={setShopLocation} placeholder="Enter the location"/>
          <Input type="file" accept="image/*" hidden />
          <LandingButton my={2} text="Add a logo" onClick={() => inputElement.current.click()}/>
          <Input type="file" accept="image/*" ref={inputElement} hidden onChange={readImage}/>
          {image && <Image src={image} h={10} w={10} mt={2} borderRadius="50%"/>}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose} isDisabled={isRegistering}>
            Close
          </Button>
          <Button colorScheme="purple" onClick={handleRegistration} isLoading={isRegistering}>
            Register
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
