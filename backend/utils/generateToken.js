import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const generateToken = (id, isOwner, res) => {
    // sign a jwt
    const token = jwt.sign({userId: id, isOwner}, JWT_SECRET);

    // store in cookies
    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 5 * 24 * 60 * 60 * 1000,
        // secure: true ---> production
    });

    // return token
    return token;
}

export default generateToken;