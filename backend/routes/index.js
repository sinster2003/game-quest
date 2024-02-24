import express from "express";
import customersRouter from "./customers.js";
import ownersRouter from "./owners.js";
import customerAuth from './../middlewares/customerAuth.js';
import getGames from "../controllers/getGames.js";

const apiRouter = express.Router();

apiRouter.use("/customers", customersRouter);
apiRouter.use("/owners", ownersRouter);

// not a customer or owner specific route but only a customer must access it
apiRouter.get("/games-collection", customerAuth, getGames);

export default apiRouter;