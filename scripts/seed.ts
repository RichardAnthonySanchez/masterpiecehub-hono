import mongoose from "mongoose";
import data from "../data/data.json" with { type: "json" };

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI not set in environment variables");
}

async function seedDatabase() {
  try {
    await mongoose.connect(mongoUri as string, { dbName: "tonys_data" });
    console.log("✅ Connected to MongoDB");

    const GenericModel = mongoose.model(
      "artwork",
      new mongoose.Schema({}, { strict: false }),
      "artwork"
    );

    await GenericModel.deleteMany({});
    console.log("🧹 Cleared old data");

    await GenericModel.insertMany(data);
    console.log(`🌱 Inserted ${data.length} art pieces into "artwork"`);

  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Disconnected");
  }
}

seedDatabase();
