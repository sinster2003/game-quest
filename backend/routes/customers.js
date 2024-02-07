import express from "express";
import signupCustomer from "../controllers/customers/signupCustomer";
import loginCustomer from "../controllers/customers/loginCustomer";
import customerAuth from "../middlewares/customerAuth";

const customersRouter = express.Router();

// customerAuth verifiers jwt of a customer
customersRouter.post("/signup", signupCustomer);
customersRouter.post("/login", loginCustomer);
customersRouter.get("/dashboard", customerAuth, getCustomerDashboard);

export default customersRouter;