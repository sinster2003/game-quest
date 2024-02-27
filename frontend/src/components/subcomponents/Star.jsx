import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import useToaster from "../../hooks/useToaster";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import ratingCountAtom from "../../atoms/ratingCountAtom";

const Star = ({ gameId}) => {
  const {id} = useParams();
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useRecoilState(ratingCountAtom);
  const toast = useToaster();
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredValue, setHoveredValue] = useState(0);

  useEffect(() => {
    // getting avg ratings
    const getAvgRatings = async () => {
      try {
        const response = await axios.get(`/api/v1/customers/avg-game-rating/${id}`);
        const result = await response.data;
        setRating(result?.find(res => res._id === id).ratingAvg || 0);
        setRatingCount(result?.find(res => res._id === id).ratingCount || 0);
      }
      catch(error) {
        console.log(error);
      }
    }
    getAvgRatings();
  }, [id]);

  // memoize the roundRating
  const roundRatingArray = useMemo(() => {
    const round = [];
    const value = isHovering ? hoveredValue : Math.round(rating);
    for (let i = 1; i <= value; i++) {
      round.push(i);
    }
    return round;
  }, [rating, hoveredValue]);

  // memoize the remainingRating
  const remainingRatingArray = useMemo(() => {
    const remain = [];
    const value = isHovering ? hoveredValue : Math.round(rating);
    console.log("Valu", value);
    for (let i = value + 1; i <= 5; i++) {
      remain.push(i);
    }
    return remain;
  }, [rating, hoveredValue]);
  
  const handleRating = async (newRating) => {
    try{
      const response = await axios.post(`/api/v1/customers/rating-game/${gameId}`, {
        rating: newRating
      });
      const result = await response.data; 
      toast("Rated Successfully", result?.message, "success");
      setRating((rating + newRating) / (ratingCount + 1));
      setRatingCount(ratingCount + 1);
      setIsHovering(false);
      setHoveredValue(0);
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
              onMouseOver={() => {
                setIsHovering(true);
                setHoveredValue(round);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoveredValue(0);
              }}
              onClick={() => handleRating(round)}
              cursor="pointer"
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
              onMouseOver={() => {
                setIsHovering(true);
                setHoveredValue(remain);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoveredValue(0);
              }}
              onClick={() => handleRating(remain)}
              cursor="pointer"
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Star;
