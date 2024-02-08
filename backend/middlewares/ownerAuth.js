import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config.js";
import Owner from "../models/owners.js";

const ownerAuth = (req, res, next) => {
    // retrieve cookies
    const {jwt} = req.cookies;

    // check jwt
    const {userId, isOwner} = JWT.verify(jwt, JWT_SECRET);

    // check isOwner
    if(!isOwner) {
        return res.status(400).json({message: "Not authorized to access owner routes"});
    }

    // check if owner is present
    const owner = Owner.findById(userId);

    if(!owner) {
        return res.status(400).json({message: "No owner found"});
    }

    // add id in the req.owner object
    req.owner = userId;

    next();
}

export default ownerAuth;