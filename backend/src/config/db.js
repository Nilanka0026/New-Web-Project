import mongoose from "mongoose"
export const connectDB = async () => {
  try {
   await mongoose.connect("mongodb+srv://nilankaofficial2001_db_user:35SCCJGjxqBsWozY@cluster0.skbcrvg.mongodb.net/N_techDB?retryWrites=true&w=majority&appName=Cluster0")
    console.log("MongoDB connected")
    } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
    }
};