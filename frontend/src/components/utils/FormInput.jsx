import { Button, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const FormInput = ({placeholder, register, label, type}) => {
  const [show, setShow] = useState(type === "password" ? false: true);

  return (
    <InputGroup>
    <Input
      placeholder={placeholder}
      variant="filled"
      bg="#2d2a39"
      _placeholder={{ color: "#5a555e" }}
      _hover={{}}
      focusBorderColor="purple.shadowLight"
      {...register(label)}
      type={show ? "text": "password"}
    />
    {type && <InputRightElement>
      <Button variant={"ghost"} color="grey.text" _hover={{bg:"rgba(255,255,255,0.2)"}} onClick={() => setShow(!show)}>
        <Icon as={show ? IoMdEyeOff : IoMdEye}/>
      </Button>
    </InputRightElement>}
    </InputGroup>
  )
}

export default FormInput