import { Flex, Icon, IconButton, Image, Text } from '@chakra-ui/react'
import Subtext from '../utils/Subtext'
import { RxCross2 } from "react-icons/rx";
import { useRecoilState } from 'recoil';
import cartAtom from '../../atoms/cartAtom';
import useToaster from '../../hooks/useToaster';

const CartCard = ({game}) => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const toast = useToaster();

  const handleRemove = () => {
    const filteredArray = cart?.filter(cart => cart._id !== game._id);
    setCart(filteredArray);
    localStorage.setItem("cart", JSON.stringify(filteredArray))
    toast("Successful Removal", `${game.title} removed from the cart`, "success")
  }

  return (
    <Flex justifyContent="center" alignItems="center" w="full" gap={4} position="relative">
        <Image src={game?.image} alt={game?.title} w={20} h={20}/>
        <Subtext text={game?.title?.length > 20 ? `${game?.title?.slice(0,15)}...` : game?.title}/>
        <Text color="purple.shadowLight" fontWeight="bold">${game?.price}</Text>
        <IconButton borderRadius="50%" bg="whiteAlpha.100" _hover={{bg: "whiteAlpha.200"}} color="white.light" onClick={handleRemove}>
            <Icon as={RxCross2}/>
        </IconButton>
    </Flex>
  )
}

export default CartCard