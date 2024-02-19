import { useState } from "react";
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
import axios from "axios";
import useToaster from "../../hooks/useToaster";
import { useRecoilState } from "recoil";
import ModalInput from "../utils/ModalInput";
import { userAtom } from "../../atoms/userAtom";

const RegisterModal = ({ isOpen, onClose }) => {
  const [shopName, setShopName] = useState("");
  const [shopLocation, setShopLocation] = useState("");
  const toast = useToaster();
  const [userLoggedInData, setUserLoggedInData] = useRecoilState(userAtom);

  const handleRegistration = async () => {
    try {
      const response = await axios.post(`/api/v1/owners/register-marketplace`, {
        name: shopName,
        location: shopLocation,
        logo: "", // hardcoded
      });
      const result = await response.data;
      toast("Registration successful", result?.message, "success");
      setUserLoggedInData({...userLoggedInData, shop: result?.shop})
      setShopName("");
      setShopLocation("");
      onClose();
    } catch (error) {
      console.log(error);
      toast(
        "Error occurred",
        "Registration of the marketplace was unsuccessful",
        "error"
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="purple.bg">
        <ModalHeader>Register Your Digital Marketplace</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ModalInput value={shopName} setValue={setShopName} placeholder="Enter the name of the marketplace"/>
          <ModalInput value={shopLocation} setValue={setShopLocation} placeholder="Enter the location"/>
          <Input type="file" accept="image/*" hidden />
          <LandingButton my={2} text="Add a logo" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="purple" onClick={handleRegistration}>
            Register
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
