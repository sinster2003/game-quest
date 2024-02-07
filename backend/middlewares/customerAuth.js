import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";

const customerAuth = (req, res, next) => {
    // retrieve cookies
    const {jwt: jwtToken} = req.cookies;

    // check jwt
    const {userId, isOwner} = jwt.verify(jwtToken, JWT_SECRET);

    // check !isOwner
    if(isOwner) {
        return res.status(400).json({message: "Not authorized to access customer routes"});
    }

    // add id in the req.customer object
    req.customer = userId;

    next();
}

export default customerAuth;