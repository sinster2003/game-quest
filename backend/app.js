import express from "express";
import connectDb from "./db.js";
import "express-async-errors";
import cors from "cors";
import apiRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import {v2 as cloudinary} from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from "./utils/config.js";
import path from "path";

connectDb(); // connecting database

const app = express();

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const corsOption = {
    origin: true,
    credentials: true
}

// middlewares
app.use(cors(corsOption)); // avoid cors errors
app.use(express.json({limit: "50mb"})); // access req.body
app.use(express.urlencoded({extended: true, limit: "50mb"})); // parses form data
app.use(cookieParser());
app.use(express.static()); // to handle static build files 

// version router
app.use("/api/v1", apiRouter);

// error handler
app.use(errorHandler);

// deployed route handler
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
})

export default app;