import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const BASE_URI = process.env.MONGODB_URI;
if (!BASE_URI) {
  console.error("❌ MONGODB_URI environment variable is required for cleanDb.");
  process.exit(1);
}

async function cleanCluster() {
  console.log("Connecting to MongoDB Atlas cluster for cleanup...");
  
  // 1. Clean 'test' database collections
  const testConn = await mongoose.createConnection(`${BASE_URI}/test?retryWrites=true&w=majority`).asPromise();
  console.log("Connected to 'test' database.");
  const testCols = await testConn.db!.listCollections().toArray();
  console.log("Found collections in 'test':", testCols.map((c: any) => c.name));
  for (const col of testCols) {
    console.log(`Dropping collection: test.${col.name}`);
    await testConn.db!.dropCollection(col.name);
  }
  await testConn.close();
  console.log("Cleared 'test' database completely.");

  // 2. Clean 'ili_languages_indore' database collections (if any)
  const iliConn = await mongoose.createConnection(`${BASE_URI}/ili_languages_indore?retryWrites=true&w=majority`).asPromise();
  console.log("Connected to 'ili_languages_indore' database.");
  const iliCols = await iliConn.db!.listCollections().toArray();
  console.log("Found collections in 'ili_languages_indore':", iliCols.map((c: any) => c.name));
  for (const col of iliCols) {
    console.log(`Dropping collection: ili_languages_indore.${col.name}`);
    await iliConn.db!.dropCollection(col.name);
  }
  await iliConn.close();
  console.log("Cleared 'ili_languages_indore' database completely.");

  console.log("Cleanup completed successfully! Cluster is pristine.");
}

cleanCluster()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Cleanup failed:", err);
    process.exit(1);
  });
