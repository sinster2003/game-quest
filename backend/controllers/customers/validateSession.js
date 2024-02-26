import { SESSION_ID } from "../../utils/config.js";

import Stripe from "stripe";
const stripe = new Stripe(SESSION_ID);

// for retrieving the customer details 
const validateSession = async (req, res) => {
    const id = req.params.id;

    // retrieving the session for line items from checkout id
    const session = await stripe.checkout.sessions.retrieve(id, {
        expand: ["line_items"]
    });

    // checking the status of the payment
    if(session.status !== "complete") {
        return res.status(400).json({message: "Session Id Invalid"});
    }
    
    // getting the session product ids for retreiving each product
    const productSessionIds = session.line_items.data.map((data) => {
        return data.price.product;
    });

    // retrieving each product
    const products = await Promise.all(productSessionIds.map(async (id) => await stripe.products.retrieve(id)));

    // popping out each game id which is associated to the game purchased
    const gamesIds = products.map(product => {
        return product.name.split("###").pop();
    });

    res.status(200).json({message: "Payment completed and successful", gamesIds});
}

export default validateSession;