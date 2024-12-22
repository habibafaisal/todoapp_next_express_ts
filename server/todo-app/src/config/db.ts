import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const uri: string | undefined = process.env.MONGO_URI;

        if (!uri) {
            throw new Error("MONGO_URI environment variable is not defined");
        }

        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
