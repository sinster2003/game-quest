import { Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import cartAtom from '../atoms/cartAtom';
import useToaster from './../hooks/useToaster';
import { userAtom } from '../atoms/userAtom';

const Success = () => {
  const {id} = useParams();
  const [message, setMessage] = useState("");
  const setCartItems = useSetRecoilState(cartAtom);
  const setUserLoggedInData = useSetRecoilState(userAtom);
  const toast = useToaster();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrderAndPurchase = async () => {
      try {
      // validating payment and retreive the gameIds from line_items
      const response = await axios.get(`/api/v1/customers/order-success/${id}`);
      const result = await response.data;
      
      // buying the games using promise all to resolve all the buying of games
      const gameResponse = await Promise.all(result?.gamesIds.map(async (gameId) => await axios.post(`/api/v1/customers/buy-game`, {
          gameId
        })
      ));
      const gamesResult = await gameResponse.data;
      
      // set a message if successful
      setMessage(result?.message);       
      toast("Payment successful", `Games Purchased Successfully! go to the dashboard`, "success");
      setCartItems([]);
      setUserLoggedInData(prevData => ({...prevData, gamesResult}))
    }
      catch(error) {
        console.log(error);
        toast("Error occurred", "Payment unsuccessful redirecting to the dashboard", "error");
        navigate("/customer-dashboard");
      }
    }
    getOrderAndPurchase();
  }, [id]);

  return (
    <>
    <Text>{message}</Text>
    </>
  )
}

export default Success