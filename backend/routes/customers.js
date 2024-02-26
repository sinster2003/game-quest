import express from "express";
import signupCustomer from "../controllers/customers/signupCustomer.js";
import loginCustomer from "../controllers/customers/loginCustomer.js";
import customerAuth from "../middlewares/customerAuth.js";
import getCustomerDashboard from "../controllers/customers/getCustomerDashboard.js";
import updateProfile from "../controllers/customers/updateProfile.js";
import buyGame from "../controllers/customers/buyGame.js";
import rateGame from "../controllers/customers/rateGame.js";
import reviewGame from "../controllers/customers/reviewGame.js";
import boughtGameAuth from './../middlewares/boughtGameAuth.js';
import logoutCustomer from "../controllers/customers/logoutCustomer.js";
import getGameDetails from "../controllers/customers/getGameDetails.js";
import getSession from "../controllers/customers/getSession.js";
import validateSession from "../controllers/customers/validateSession.js";
import getAvgRating from "../controllers/customers/getAvgRating.js";

const customersRouter = express.Router();

// customerAuth verifiers jwt of a customer
customersRouter.post("/signup", signupCustomer);
customersRouter.post("/login", loginCustomer);
customersRouter.post("/logout", logoutCustomer);
customersRouter.get("/dashboard", customerAuth, getCustomerDashboard);
customersRouter.put("/update-profile", customerAuth, updateProfile);
customersRouter.post("/buy-game", customerAuth, buyGame);
customersRouter.post("/rating-game/:id", customerAuth, boughtGameAuth, rateGame);
customersRouter.get("/avg-game-rating/:id", customerAuth, getAvgRating);
customersRouter.post("/review-game/:id", customerAuth, boughtGameAuth, reviewGame);
customersRouter.get("/get-game-details/:id", customerAuth, getGameDetails);
customersRouter.post("/checkout-session", customerAuth, getSession);
customersRouter.get("/order-success/:id", customerAuth, validateSession);

export default customersRouter;