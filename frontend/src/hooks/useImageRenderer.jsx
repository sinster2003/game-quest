import { useState } from "react";

const useImageRenderer = () => {
  const [image, setImage] = useState("");

  // converts an image into 64 base string
  const readImage = (e) => {
    const file = e.target.files[0];

    if(file.type?.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImage(reader?.result);
      }
    }
  }
  
  return {image, setImage, readImage};
}

export default useImageRenderer;