import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI!;
if (!mongoUri) {
  throw new Error("MONGO_URI not set in environment variables");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      dbName: "test",
    });
    console.log("✅ Connected to MongoDB on railway test");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};
