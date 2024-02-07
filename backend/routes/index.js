import express from "express";
import customersRouter from "./customers.js";
import ownersRouter from "./owners.js";

const apiRouter = express.Router();

apiRouter.use("/customers", customersRouter);
apiRouter.use("/owners", ownersRouter);

export default apiRouter;