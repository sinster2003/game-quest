import express from "express";
import signupOwner from "../controllers/owners/signupOwner.js";
import loginOwner from "../controllers/owners/loginOwner.js";
import ownerAuth from "../middlewares/ownerAuth.js";
import getOwnerDashboard from "../controllers/owners/getOwnerDashboard.js";
import uploadGame from "../controllers/owners/uploadGame.js";
import deleteGame from "../controllers/owners/deleteGame.js";
import updateProfile from "../controllers/owners/updateProfile.js";
import registerMarketplace from "../controllers/owners/registerMarketplace.js";
import registeredMarketplace from "../middlewares/registeredMarketplace.js";
import logoutOwner from "../controllers/owners/logoutOwner.js";
import getGame from "../controllers/owners/getGame.js";

const ownersRouter = express.Router();

// ownerAuth verifiers jwt of a owner
ownersRouter.post("/signup", signupOwner);
ownersRouter.post("/login", loginOwner);
ownersRouter.post("/logout", logoutOwner);
ownersRouter.get("/dashboard", ownerAuth, getOwnerDashboard);
ownersRouter.put("/update-profile", ownerAuth, updateProfile);
ownersRouter.post("/register-marketplace", ownerAuth, registerMarketplace);
ownersRouter.get("/get-game/:id", ownerAuth, registeredMarketplace, getGame);
ownersRouter.post("/upload-game", ownerAuth, registeredMarketplace, uploadGame);
ownersRouter.delete("/delete-game/:id", ownerAuth, registeredMarketplace, deleteGame);

export default ownersRouter;