import { Button } from '@chakra-ui/react'

const LandingButton = ({text}) => {
  return (
    <Button
      bgGradient={"linear(to-r, purple.buttonLeft, purple.buttonRight)"}
      _hover={{ boxShadow: '0px 0px 10px 5px #7a6ac3'}}
      _active={{}}
      _focus={{}}
      w={"fit-content"}
    >
      {text}
    </Button>
  )
}

export default LandingButton