import { Box, Flex } from "@chakra-ui/react";
import Subheading from "../../utils/Subheading";
import Subtext from "../../utils/Subtext";
import LandingButton from "../../utils/LandingButton";
import { useState } from "react";
import HoverImage from "../../utils/HoverImage";
import Shadow from "../../utils/Shadow";
import { motion } from 'framer-motion';

const Herocontent = () => {
  const [changingText, setChangingText] = useState("Delve into the gameplay");
  
  return (
    <Flex flexDirection="column" mt={20}>
      {/* customer content */}
      <motion.div 
        initial={{
          opacity: 0,
          transform: "translateX(50px)",
        }}
        whileInView={{
          opacity: 1,
          transform: "translateX(0)"
        }}
        transition={{
          duration: 0.6
        }}
      >
      <Flex
        alignItems="center"
        justifyContent="space-around"
        gap={20}
        minH={600}
        position="relative"
      >
        <Shadow top={20} left={20} blur={500} spread={50} color={"#7a6ac3"} />
        <Box
          position="relative"
          w={{ base: 300, md: 500 }}
          onMouseLeave={() => setChangingText("Delve into the gameplay")}
        >
          <HoverImage
            src={"/GTAV.png"}
            degree={"-30"}
            initZIndex={0}
            changeText={"GTA V"}
            setChangingText={setChangingText}
          />
          <HoverImage
            src={"/RedDead.png"}
            degree={"-20"}
            initZIndex={0}
            changeText={"Red Dead Redemption"}
            setChangingText={setChangingText}
          />
          <HoverImage
            src={"/WatchDogs.jpeg"}
            degree={"-10"}
            initZIndex={10}
            changeText={"WatchDogs2"}
            setChangingText={setChangingText}
          />
        </Box>

        <Flex flexDirection="column" w={{ base: 300, md: 600 }}>
          <Subheading text={changingText} size="5xl" />
          <Subtext text="Enjoy the look and feel of the games you buy. If you are a vendor sell some amazing games contributing to the gamer community" />
          <LandingButton text="Buy now" />
        </Flex>
      </Flex>
      </motion.div>

      {/* vendor content */}
      <motion.div 
        initial={{
          opacity: 0,
          transform: "translateX(-50px)",
        }}
        whileInView={{
          opacity: 1,
          transform: "translateX(0)"
        }}
        transition={{
          duration: 0.6
        }}
      >
      <Flex
        alignItems="center"
        justifyContent="space-around"
        gap={20}
        minH={600}
      >
        <Flex flexDirection="column" w={{ base: 300, md: 600 }} mt={20}>
          <Subheading text={"Sell awesome games"} size="5xl" />
          <Subtext text="Contributing to the gamer community? Sell some good games and register your online gaming marketplace" />
          <LandingButton text="Sell Now" />
        </Flex>

        <Box
          position="relative"
          w={{ base: 300, md: 500 }}
          onMouseLeave={() => setChangingText("Delve into the gameplay")}
        >
          <Shadow top={0} left={0} blur={500} spread={60} color={"#7a6ac3"} />
          <HoverImage
            src={"/marketplace3.png"}
            degree={"-30"}
            initZIndex={0}
            changeText={"GTA V"}
            setChangingText={setChangingText}
          />
          <HoverImage
            src={"/marketplace2.png"}
            degree={"-20"}
            initZIndex={0}
            changeText={"Red Dead Redemption"}
            setChangingText={setChangingText}
          />
          <HoverImage
            src={"/marketplace1.png"}
            degree={"-10"}
            initZIndex={10}
            changeText={"WatchDogs2"}
            setChangingText={setChangingText}
          />
        </Box>
      </Flex>
      </motion.div>
    </Flex>
  );
};

export default Herocontent;
