import { Avatar, Box, Divider, Flex, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";

const ReviewCard = ({review}) => {
  const [pic, setPic] = useState("");

  useEffect(() => {
    const getConstumerWhoReviewed = async () => {
      const response = await axios.get(`/api/v1/customers/get-reviewer-info/${review?.customer_id}`);
      const result = await response.data;
      setPic(result?.profilePic);
    }
    getConstumerWhoReviewed();
  }, []);

  return (
    <Box px={4}>
    <Flex my={6} gap={4} alignItems="center">
      <Avatar name="Reviewer" src={pic}/>
      <Text fontSize="lg">{review.review}</Text>
    </Flex>
    <Divider opacity={0.2}/>
    </Box>
  )
}

export default ReviewCard