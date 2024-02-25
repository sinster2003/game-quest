import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userAtom, userSelector } from '../atoms/userAtom';
import { useNavigate } from 'react-router-dom';
import useToaster from '../hooks/useToaster';
import { Button, Flex } from '@chakra-ui/react';
import Subheading from '../components/utils/Subheading';
import GameCard from '../components/subcomponents/GameCard';
import axios from 'axios';

const Shopping = () => {
  const userLoggedInData = useRecoilValue(userAtom);
  const userLoggedInDataLoadable = useRecoilValueLoadable(userSelector);
  const navigate = useNavigate();
  const toast = useToaster();
  const [gamesStore, setGamesStore] = useState(null);
  
  // pagination
  const gamesPerPage = 8;
  const [gamesLength, setGamesLength] = useState(0);
  const [pageNumbers, setPageNumbers] = useState(1);
  const [slicedArray, setSlicedArray] = useState(null);
  const [selectedButton, setSelectButton] = useState(1);

  // memoizing the page numbers and recomputes only if pageNumbers changes
  const pageNumberArray = useMemo(() => {
    const pages = [];
    for(let i = 1; i <= pageNumbers; i++) {
      pages.push(i);
    }
    return pages;
  }, [gamesLength, pageNumbers]);

  useEffect(() => {
    if(!userLoggedInData) {
      navigate("/login");
      toast("Login", "Please login to shop the games", "error");
    }
    else if(userLoggedInDataLoadable?.contents?.isOwner && !JSON.parse(localStorage.getItem("logged-out"))) {
      navigate("/owner-dashboard");
      toast("Denied Access", "Please login as a customer", "error");
    }

    const getGames = async () => {
      if(!gamesStore) {
        const response = await axios.get("api/v1/games-collection");
        const games = await response.data;
        // slicing the array logic
        setGamesStore(games);
        setGamesLength(games?.length);
        setPageNumbers(Math.ceil(games?.length / gamesPerPage));
        setSlicedArray(games?.slice(0, gamesPerPage));
      }
    }
    getGames();
  }, [userLoggedInData, userLoggedInDataLoadable]);

  const handlePagination = (page_no) => {
    // slicing the array logic
    const startingIndex = (page_no - 1) * gamesPerPage;
    const endingIndex = page_no * gamesPerPage;
    setSlicedArray(gamesStore?.slice(startingIndex, endingIndex));
    setSelectButton(page_no);
  }

  return (
    <Flex flexDirection="column" mt={10} alignItems="center">
      <Subheading text="Games" size="4xl" w="fit-content"/>   
      <Flex flexDirection="row" flexWrap="wrap" gap={10} justifyContent="center" mt={8}>
        {
          slicedArray?.map(game => {
            return <GameCard key={game._id} game={game}/>
          })
        }
      </Flex>
      <Flex gap={2} mt={10}>
      {
        (gamesLength !== 0) &&
        pageNumberArray?.map(page => {
          return <Button key={page} bg={selectedButton === page ? "purple.700" : "purple.300"} color={selectedButton === page ? "white.light" : "purple.bg"} onClick={() => handlePagination(page)} _hover={{}}>{page}</Button>
        })
      }
      </Flex>
    </Flex>
  )
}

export default Shopping