import { Button } from '@chakra-ui/react'

const LandingButton = ({type, text, w, my, onClick, isDisabled, isLoading}) => {
  return (
    <Button
      bgGradient={"linear(to-r, purple.buttonLeft, purple.buttonRight)"}
      _hover={{ boxShadow: '0px 0px 10px 5px #7a6ac3'}}
      color="white"
      _active={{}}
      _focus={{}}
      w={w || "fit-content"}
      type={type || "button"}
      my={my}
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      {text}
    </Button>
  )
}

export default LandingButton