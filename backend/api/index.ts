import { app } from "../src/app";
import { connectMongo } from "../src/models/db";
import { store } from "../src/models/store";

let isMongoInitialized = false;

export default async function handler(req: any, res: any) {
  // Lazily connect to MongoDB and cache the connection across lambda warm invocations
  if (!isMongoInitialized) {
    try {
      const mongo = await connectMongo();
      if (mongo) {
        await store.loadFromMongo();
      }
    } catch (err: any) {
      console.warn("MongoDB connection warning in Vercel function:", err.message);
    }
    isMongoInitialized = true;
  }

  // Pass request to Express application
  return app(req, res);
}
