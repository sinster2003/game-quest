import { atom } from "recoil";

const cartAtom = atom({
    key: "cartAtom",
    default: JSON.parse(localStorage.getItem("cart")) || []
})

export default cartAtom;