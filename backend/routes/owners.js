import express from "express";
import signupOwner from "../controllers/owners/signupOwner.js";
import loginOwner from "../controllers/owners/loginOwner.js";
import ownerAuth from "../middlewares/ownerAuth.js";
import getOwnerDashboard from "../controllers/owners/getOwnerDashboard.js";

const ownersRouter = express.Router();

// ownerAuth verifiers jwt of a owner
ownersRouter.post("/signup", signupOwner);
ownersRouter.post("/login", loginOwner);
ownersRouter.get("/dashboard", ownerAuth, getOwnerDashboard);

export default ownersRouter;