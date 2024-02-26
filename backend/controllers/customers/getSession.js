import { SESSION_ID } from "../../utils/config.js";

import Stripe from "stripe";
const stripe = new Stripe(SESSION_ID);

const getSession = async (req, res) => {
  const { cartItems } = req.body;

  const params = {
    mode: "payment",
    submit_type: "pay",
    billing_address_collection: "auto",
    currency: "usd",
    payment_method_types: ["card"],
    line_items: cartItems.map((cartItem) => {
      return ({
      price_data: {
        currency: "usd",
        unit_amount: cartItem.price * 100,
        product_data: {
          name: cartItem.title,
          description: cartItem.description,
          images: [cartItem.image]
        }
      },
      quantity: 1
    })
  }),
    success_url: `${req.headers.origin}/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/`,
  };

  const session = await stripe.checkout.sessions.create(params);
  res.status(200).json({sessionUrl: session.url});
};

export default getSession;
