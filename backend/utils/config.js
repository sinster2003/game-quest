import dotenv from "dotenv" 
dotenv.config(); // access process.env

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.PORT;