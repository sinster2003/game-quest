import express from "express";
import signupCustomer from "../controllers/customers/signupCustomer.js";
import loginCustomer from "../controllers/customers/loginCustomer.js";
import customerAuth from "../middlewares/customerAuth.js";
import getCustomerDashboard from "../controllers/customers/getCustomerDashboard.js";

const customersRouter = express.Router();

// customerAuth verifiers jwt of a customer
customersRouter.post("/signup", signupCustomer);
customersRouter.post("/login", loginCustomer);
customersRouter.get("/dashboard", customerAuth, getCustomerDashboard);

export default customersRouter;