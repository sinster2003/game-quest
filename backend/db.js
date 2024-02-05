// connection to mongodb
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected at ${mongoose.connection.host}`)
    }
    catch(error) {
        console.log(error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

export default connectDb;