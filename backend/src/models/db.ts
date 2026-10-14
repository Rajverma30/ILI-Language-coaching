import mongoose from "mongoose";
import { config } from "../config";
import {
  CourseModel,
  UserModel,
  StudentModel,
  LeadModel,
  OrderModel,
  SettingsModel,
} from "./schemas";
import {
  initialCourses,
  initialUsers,
  initialStudents,
  initialLeads,
  initialOrders,
  initialInstituteSettings,
} from "../utils/seedData";

let isConnected = false;
let retryTimeout: NodeJS.Timeout | null = null;

export async function connectMongo(): Promise<typeof mongoose | null> {
  if (isConnected && mongoose.connection.readyState === 1) return mongoose;

  const mongoUri = config.mongodb.uri;
  const dbName = config.mongodb.dbName || "ili_languages_indore";

  if (!mongoUri) {
    console.log("ℹ️ MONGODB_URI not configured. Operating with high-fidelity in-memory seed store.");
    return null;
  }

  try {
    const fullUri = mongoUri.includes("?")
      ? mongoUri.replace(/\/[^/?]*\?/, `/${dbName}?`)
      : `${mongoUri.replace(/\/$/, "")}/${dbName}?retryWrites=true&w=majority`;

    console.log(`Connecting to MongoDB Atlas database: ${dbName}...`);
    await mongoose.connect(fullUri, {
      serverSelectionTimeoutMS: 8000,
    });

    isConnected = true;
    console.log(`✅ Connected successfully to MongoDB Atlas (${dbName})`);

    // Ensure database is populated with initial courses/users if empty (DO NOT seed leads)
    await autoSeedIfEmpty();

    // Import store dynamically to reload live mongo state
    const { store } = await import("./store");
    await store.loadFromMongo();

    return mongoose;
  } catch (err: any) {
    console.error("❌ MongoDB Atlas Connection Error:", err.message);
    isConnected = false;

    // Retry connection automatically every 10 seconds so when user whitelists IP, it connects instantly
    if (!retryTimeout) {
      retryTimeout = setTimeout(() => {
        retryTimeout = null;
        connectMongo();
      }, 10000);
    }

    return null;
  }
}

export async function autoSeedIfEmpty(): Promise<void> {
  try {
    // 1. Seed Courses
    const courseCount = await CourseModel.countDocuments();
    if (courseCount === 0) {
      console.log(`Seeding ${initialCourses.length} initial courses to MongoDB...`);
      await CourseModel.insertMany(initialCourses);
      console.log(`✓ Initial courses seeded.`);
    }

    // 2. Seed Users
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      console.log(`Seeding initial users (including Admin and Students) to MongoDB...`);
      await UserModel.insertMany(initialUsers);
      console.log(`✓ Initial users seeded.`);
    }

    // 3. Seed Students
    const studentCount = await StudentModel.countDocuments();
    if (studentCount === 0) {
      console.log(`Seeding initial students to MongoDB...`);
      await StudentModel.insertMany(initialStudents);
      console.log(`✓ Initial students seeded.`);
    }

    // 4. Leads are never auto-seeded (real prospective student inquiries only)

    // 5. Seed Orders
    const orderCount = await OrderModel.countDocuments();
    if (orderCount === 0) {
      console.log(`Seeding initial orders to MongoDB...`);
      await OrderModel.insertMany(initialOrders);
      console.log(`✓ Initial orders seeded.`);
    }

    // 6. Seed Settings
    const settingsCount = await SettingsModel.countDocuments();
    if (settingsCount === 0) {
      console.log(`Seeding initial institute settings to MongoDB...`);
      await SettingsModel.create({
        ...initialInstituteSettings,
        bunnyLibraryId: config.bunnyStream.libraryId || "",
        bunnyApiKey: config.bunnyStream.apiKey || "",
        bunnyPullZone: config.bunnyStream.pullZone || "",
      });
      console.log(`✓ Initial institute settings seeded.`);
    }
  } catch (err: any) {
    console.error("Error during auto-seeding:", err.message);
  }
}

export {
  CourseModel,
  UserModel,
  StudentModel,
  LeadModel,
  OrderModel,
  SettingsModel,
};
