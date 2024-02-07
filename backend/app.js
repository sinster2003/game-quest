import express from "express";
import dotenv from "dotenv";
import connectDb from "./db.js";
import "express-async-errors";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config(); // access process.env

connectDb(); // connecting database

const app = express();

// middlewares
app.use(cors()); // avoid cors errors
app.use(express.json({limit: "50mb"})); // access req.body
app.use(express.urlencoded({extended: true, limit: "50mb"})); // parses form data

// version router
app.use("/api/v1", apiRouter);

// error handler
app.use(errorHandler);

export default app;