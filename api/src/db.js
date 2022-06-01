import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'erroringURI';

export default async function connectToDB(){
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected to ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error}`);
        process.exit(1);
    }
}