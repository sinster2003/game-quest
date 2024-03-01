import { Image } from '@chakra-ui/react'
import React from 'react'

const HoverImage = ({src, degree, initZIndex, changeText, setChangingText}) => {
  return (
    <Image
        src={src}
        w={{ base: 200, md: 400 }}
        transform={`rotate(${degree}deg)`}
        transformOrigin="bottom left"
        position={"absolute"}
        top={-120}
        left={150}
        _hover={{ zIndex: 20, transform: "rotate(0deg)", transition: "transform 0.6s ease-in-out" }}
        zIndex={initZIndex}
        onMouseEnter={() => setChangingText(changeText)}
        border="5px solid #9778df"
    />
  )
}

export default HoverImage