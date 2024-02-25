import { Divider } from "@chakra-ui/react"

const ReviewCard = ({review}) => {
  return (
    <>
    <Flex my={6}>
        <Text fontSize="lg">{review}</Text>
    </Flex>
    <Divider/>
    </>
  )
}

export default ReviewCard