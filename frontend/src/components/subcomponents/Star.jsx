import { Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ rating }) => {
  const roundRating = Math.round(rating);

  // memoize the roundRating
  const roundRatingArray = useMemo(() => {
    const round = [];
    for (let i = 1; i <= roundRating; i++) {
      round.push(i);
    }
    return round;
  }, [rating, roundRating]);

  // memoize the remainingRating
  const remainingRatingArray = useMemo(() => {
    const remain = [];
    for (let i = roundRating + 1; i <= 5; i++) {
      remain.push(i);
    }
    return remain;
  }, [rating, roundRating]);

  return (
    <Flex gap={1}>
      <Flex gap={1}>
        {roundRatingArray?.map((round) => {
          return <FaStar key={round} size={20} fill="yellow" />;
        })}
      </Flex>
      <Flex gap={1}>
        {remainingRatingArray?.map((remain) => {
          return <FaStar key={remain} size={20} fill="white" />;
        })}
      </Flex>
    </Flex>
  );
};

export default Star;
