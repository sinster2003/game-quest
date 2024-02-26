import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import useToaster from "../../hooks/useToaster";

const Star = ({ rating, gameId }) => {
  const [roundRating, setRoundRating] = useState(Math.round(rating));
  const toast = useToaster();
  if(isNaN(roundRating) || roundRating === undefined || roundRating === null) {
    setRoundRating(0);
  }

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

  const handleRating = async (newRating) => {
    try{
        const response = await axios.post(`/api/v1/customers/rating-game/${gameId}`, {
          rating: newRating
        });
        const result = await response.data; 
        toast("Rated Successfully", `You rated this game ${newRating} stars`, "success");
    }
    catch(error) {
        console.log(error);
        toast("Rating unsuccessful", `${error?.response?.data?.message}`, "error");
    }
  }

  return (
    <Flex w={110}>
      <Flex gap={1}>
        {/* yellow stars */}
        {roundRatingArray?.map((round) => {
          return (
            <FaStar
              key={round}
              size={20}
              fill="yellow"
              onMouseOver={() => setRoundRating(round)}
              onMouseLeave={() => setRoundRating(Math.round(rating))}
              onClick={() => handleRating(round)}
            />
          );
        })}
        {/* white stars */}
        {remainingRatingArray?.map((remain) => {
          return (
            <FaStar
              key={remain}
              size={20}
              fill="white"
              onMouseOver={() => setRoundRating(remain)}
              onMouseLeave={() => setRoundRating(Math.round(rating))}
              onClick={() => handleRating(remain)}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Star;
