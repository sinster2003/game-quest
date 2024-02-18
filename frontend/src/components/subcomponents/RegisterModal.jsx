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
import { useRecoilStateLoadable } from "recoil";
import { userSelector } from "../../atoms/userAtom";

const RegisterModal = ({ isOpen, onClose }) => {
  const [shopName, setShopName] = useState("");
  const [shopLocation, setShopLocation] = useState("");
  const toast = useToaster();
  const [
    userLoggedInDataLoadable,
    setUserLoggedInDataLoadable,
  ] = useRecoilStateLoadable(userSelector);

  const handleRegistration = async () => {
    try {
      const response = await axios.post(`/api/v1/owners/register-marketplace`, {
        name: shopName,
        location: shopLocation,
        logo: "", // hardcoded
      });
      const result = await response.data;
      toast("Registration successful", result?.message, "success");
      setUserLoggedInDataLoadable((prevData) => ({
        ...prevData,
        shopId: result?.shop?._id,
      }));
    } catch (error) {
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
          <Input
            my={2}
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            border="2px solid"
            borderColor="purple.shadowLight"
            _hover={{}}
            focusBorderColor="purple.600"
            placeholder="Enter the name of the marketplace"
          />
          <Input
            my={2}
            value={shopLocation}
            onChange={(e) => setShopLocation(e.target.value)}
            border="2px solid"
            borderColor="purple.shadowLight"
            _hover={{}}
            focusBorderColor="purple.600"
            placeholder="Enter the location"
          />
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
