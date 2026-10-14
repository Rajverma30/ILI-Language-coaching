import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri =
  process.env.MONGODB_URI || "";

if (!uri) {
  console.error("❌ MONGODB_URI environment variable is required for testMongo.");
  process.exit(1);
}

async function main() {
  console.log("Connecting to MongoDB Atlas...");
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log("SUCCESS: Connected to MongoDB Atlas!");
    
    const admin = mongoose.connection.db!.admin();
    const dbs = await admin.listDatabases();
    console.log("Databases on cluster:", dbs.databases.map(d => d.name));
    
    const collections = await mongoose.connection.db!.listCollections().toArray();
    console.log("Collections in ili_languages_indore:", collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log("Disconnected successfully.");
  } catch (err: any) {
    console.error("Connection failed:", err.message);
    process.exit(1);
  }
}

main();
