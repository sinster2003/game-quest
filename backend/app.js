import express from "express";
import connectDb from "./db.js";
import "express-async-errors";
import cors from "cors";
import apiRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

connectDb(); // connecting database

const app = express();

// middlewares
app.use(cors()); // avoid cors errors
app.use(express.json({limit: "50mb"})); // access req.body
app.use(express.urlencoded({extended: true, limit: "50mb"})); // parses form data
app.use(cookieParser());

// version router
app.use("/api/v1", apiRouter);

// error handler
app.use(errorHandler);

export default app;