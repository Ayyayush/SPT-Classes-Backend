import mongoose from "mongoose";
export default async function DBConnection() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed ❌");
        console.error(error.message);
        process.exit(1);
    }
}