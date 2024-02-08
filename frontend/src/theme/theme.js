import { extendTheme } from "@chakra-ui/react";

const colors = {
    purple: {
        bg: "#242131",
        shadowLight: "#7a6ac3",
        banner: "#b48cff",
        buttonLeft: "#8c87ff",
        buttonRight: "#ad87ff",
        imageBorder: "#9778df",
        border: "#8daece",
        light: "#9a8ef8"
    },
    white: {
        light: "#dde3fd",
        dark: "#b48cff"
    },
    grey: {
        text: "#8b899c"
    }
}

const styles = {
    global: () => ({
        body: {
            color: "grey.text",
            bg: "purple.bg"
        }
    })    
}

const theme = {
    colors,
    styles
}

export default extendTheme(theme);