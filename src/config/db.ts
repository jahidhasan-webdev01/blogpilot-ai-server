import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined");
    }

    await mongoose.connect(process.env.DATABASE_URL);

    console.log("✅ MongoDB Connected");
};

export default connectDB;