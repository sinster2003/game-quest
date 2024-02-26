import { Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import cartAtom from '../atoms/cartAtom';

const Success = () => {
  const {id} = useParams();
  const [message, setMessage] = useState("");
  const cartItems = useRecoilValue(cartAtom);

  useEffect(() => {
    const getCustomer = async () => {
        const response = await axios.get(`/api/v1/customers/order-success/${id}`);
        const result = await response.data;
        setMessage(result?.message);
    }
    getCustomer();
  }, [id]);

  return (
    <>
    <Text>{message}</Text>
    {
        cartItems.map((cart) => {
            return <p>{cart.title}</p>
        })
    }
    </>
  )
}

export default Success