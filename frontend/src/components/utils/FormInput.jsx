import { Input } from '@chakra-ui/react'

const FormInput = ({placeholder, register, label}) => {
  return (
    <Input
      placeholder={placeholder}
      variant="filled"
      bg="#2d2a39"
      _placeholder={{ color: "#5a555e" }}
      _hover={{}}
      focusBorderColor="purple.shadowLight"
      {...register(label)}
    />
  )
}

export default FormInput