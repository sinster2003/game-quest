import express from "express";
import signupOwner from "../controllers/owners/signupOwner";
import loginOwner from "../controllers/owners/loginOwner";
import ownerAuth from "../middlewares/ownerAuth";

const ownersRouter = express.Router();

// ownerAuth verifiers jwt of a owner
customersRouter.post("/signup", signupOwner);
customersRouter.post("/login", loginOwner);
customersRouter.get("/dashboard", ownerAuth, getOwnerDashboard);

export default ownersRouter;