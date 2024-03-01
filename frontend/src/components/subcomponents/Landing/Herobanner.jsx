import { Box, Flex, Icon, Image, Text, useMediaQuery } from '@chakra-ui/react'
import LandingButton from '../../utils/LandingButton'
import Shadow from '../../utils/Shadow'
import Subheading from '../../utils/Subheading'
import Subtext from '../../utils/Subtext'
import { MdKeyboardDoubleArrowDown } from 'react-icons/md'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'

const Herobanner = () => {
  const [isMobile] = useMediaQuery('(max-width: 500px)');
  const [isMobileOrTab] = useMediaQuery('(max-width: 900px)');

  return (
    <Flex direction="column" overflowX="hidden" mt={isMobileOrTab && 10}>
      <motion.div 
        initial={{
          opacity: 0,
          transform: "translateX(50px)"
        }}
        whileInView={{
          opacity: 1,
          transform: "translateX(0)",
        }}
        transition={{
          duration: 0.6
        }}
      >
    <Flex flexDirection={isMobileOrTab? "column": "row"} alignItems="center" justifyContent="space-around" gap={isMobileOrTab ? 5 : 20}>
      <Flex flexDirection="column" alignItems={isMobile? "center": "flex-start"}>
        <Subheading text="Buy and sell" size={isMobileOrTab ? "4xl" : "5xl"}/>
        <Subheading text="your favourite games" size={isMobileOrTab? "5xl" : "6xl"}/>
        <Subtext text="An extensive marketplace for gamers who dream to own the most popular and renowned games"/>
        <Link to="/shop-now"><LandingButton text="Shop now"/></Link>
      </Flex>
      <Box position="relative">
        <Image src="/gaming-controller.png" alt="gaming-controller-image" w={{base: 300, md: 550}} />
        {!isMobileOrTab && <Shadow top={300} left={100} blur={500} spread={100} color="#d837b9"/>}
        {isMobileOrTab && <Shadow top={150} left={120} blur={100} spread={50} color="#d837b9"/>}
      </Box>
    </Flex>
    </motion.div>
    {!isMobileOrTab && <Icon as={MdKeyboardDoubleArrowDown} boxSize={10} alignSelf="center"/>}
    </Flex>
  )
}

export default Herobanner