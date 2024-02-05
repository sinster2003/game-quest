import express from "express";
import dotenv from "dotenv";
import connectDb from "./db.js";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config(); // access process.env

connectDb();

const app = express();

// middlewares
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));

// version router
app.use("/api/v1", apiRouter);

// error handler
app.use(errorHandler);

export default app;