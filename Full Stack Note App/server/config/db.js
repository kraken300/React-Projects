import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database", conn.connection.host);

    }
    catch (error) {
        console.error("Error connecting to database", error.message);
    }
}

export default connectDB;