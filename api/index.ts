import { app } from "../backend/src/app";
import { connectMongo } from "../backend/src/models/db";
import { store } from "../backend/src/models/store";

let isMongoInitialized = false;

export default async function handler(req: any, res: any) {
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

  return app(req, res);
}
