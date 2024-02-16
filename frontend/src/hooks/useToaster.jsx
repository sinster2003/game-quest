import { useToast } from "@chakra-ui/react"

const useToaster = () => {
    const toast = useToast();

    return (title, desc, status) => (
        toast({
            title,
            description: desc,
            status,
            duration: 3000,
            isClosable: true,
            position: "bottom-right"
         })
    )
}

export default useToaster