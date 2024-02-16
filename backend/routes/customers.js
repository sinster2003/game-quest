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
import getProfile from "../controllers/customers/getProfile.js";

const customersRouter = express.Router();

// customerAuth verifiers jwt of a customer
customersRouter.post("/signup", signupCustomer);
customersRouter.post("/login", loginCustomer);
customersRouter.get("/get-profile", customerAuth, getProfile);
customersRouter.get("/dashboard", customerAuth, getCustomerDashboard);
customersRouter.put("/update-profile", customerAuth, updateProfile);
customersRouter.post("/buy-game", customerAuth, buyGame);
customersRouter.post("/rating-game/:id", customerAuth, boughtGameAuth, rateGame);
customersRouter.post("/review-game/:id", customerAuth, boughtGameAuth, reviewGame);

export default customersRouter;