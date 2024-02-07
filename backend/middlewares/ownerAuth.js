import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";

const ownerAuth = (req, res, next) => {
    // retrieve cookies
    const {jwt: jwtToken} = req.cookies;

    // check jwt
    const {userId, isOwner} = jwt.verify(jwtToken, JWT_SECRET);

    // check isOwner
    if(!isOwner) {
        return res.status(400).json({message: "Not authorized to access owner routes"});
    }

    // add id in the req.owner object
    req.owner = userId;

    next();
}

export default ownerAuth;