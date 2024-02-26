import { SESSION_ID } from "../../utils/config.js";

import Stripe from "stripe";
const stripe = new Stripe(SESSION_ID);

// for retrieving the customer details 
const validateSession = async (req, res) => {
    const id = req.params.id;

    const session = await stripe.checkout.sessions.retrieve(id);

    if(session.status !== "complete") {
        return res.status(400).json({message: "Session Id Invalid"});
    }

    res.status(200).json({message: "Payment completed and successful"});
}

export default validateSession;