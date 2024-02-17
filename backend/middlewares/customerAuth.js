import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config.js";
import Customer from "../models/customers.js"

const customerAuth = async (req, res, next) => {
    // retrieve cookies
    const {jwt} = req.cookies;

    console.log("JWT ",jwt);

    // check jwt
    const {userId, isOwner} = JWT.verify(jwt, JWT_SECRET);

    // check !isOwner
    if(isOwner) {
        return res.status(400).json({message: "Not authorized to access customer routes"});
    }

    // check if customer is present in database
    const customer = await Customer.findById(userId);

    if(!customer) {
        return res.status(400).json({message: "No customer found"});
    }

    // add id in the req.customer object
    req.customer = userId;

    next();
}

export default customerAuth;