import axios from "axios";
import { atom, selector } from "recoil";

// global atom to check to if user logged in

export const userAtom = atom({
    key: "userAtom",
    default: JSON.parse(localStorage.getItem("user")) // userId, isOwner
})

export const userSelector = selector({
    key: "userSelector",
    get: async ({get}) => {
        // database call to fetch user info
        let result;
        if(get(userAtom)) {
            const role = get(userAtom).isOwner ? "owners" : "customers";
            const response = await axios.get(`/api/v1/${role}/dashboard`, {withCredentials: true});
            result = await response.data;
        }
        return result;
    }       
})
