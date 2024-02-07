import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config.js";

const customerAuth = (req, res, next) => {
    // retrieve cookies
    const {jwt} = req.cookies;

    // check jwt
    const {userId, isOwner} = JWT.verify(jwt, JWT_SECRET);

    // check !isOwner
    if(isOwner) {
        return res.status(400).json({message: "Not authorized to access customer routes"});
    }

    // add id in the req.customer object
    req.customer = userId;

    next();
}

export default customerAuth;