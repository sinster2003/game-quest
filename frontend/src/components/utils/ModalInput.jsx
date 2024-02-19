import { Input } from '@chakra-ui/react'

const ModalInput = ({value, setValue, placeholder}) => {
  return (
    <Input
        my={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        border="2px solid"
        borderColor="purple.shadowLight"
        _hover={{}}
        focusBorderColor="purple.600"
        placeholder={placeholder}
    />
  )
}

export default ModalInput