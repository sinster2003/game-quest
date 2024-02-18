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

const UploadModal = (isOpen, onClose) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="purple.bg">
        <ModalHeader>Upload the game to be sold</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            my={2}
            value={""}
            onChange={(e) => {}}
            border="2px solid"
            borderColor="purple.shadowLight"
            _hover={{}}
            focusBorderColor="purple.600"
            placeholder="Enter the title of the game"
          />
          <Input
            my={2}
            value={"shopLocation"}
            onChange={(e) => {}}
            border="2px solid"
            borderColor="purple.shadowLight"
            _hover={{}}
            focusBorderColor="purple.600"
            placeholder="Enter the description of the game"
          />
          <Input
            my={2}
            value={"shopLocation"}
            onChange={(e) => {}}
            border="2px solid"
            borderColor="purple.shadowLight"
            _hover={{}}
            focusBorderColor="purple.600"
            placeholder="Enter the price of the game"
          />
          <Input type="file" accept="image/*" hidden />
          <LandingButton my={2} text="Add an image" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="purple">Upload</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
