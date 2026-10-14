import mongoose from "mongoose";
import {
  CourseModel,
  UserModel,
  StudentModel,
  LeadModel,
  OrderModel,
  SettingsModel,
} from "../models/schemas";
import {
  initialCourses,
  initialUsers,
  initialStudents,
  initialLeads,
  initialOrders,
  initialInstituteSettings,
} from "./seedData";

import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI || "";
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI environment variable is required for seedMongo.");
  process.exit(1);
}

async function seed() {
  console.log("Connecting to MongoDB Atlas for initial database seeding...");
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  console.log("Connected to MongoDB Atlas!");

  // Clear existing collections in ili_languages_indore
  console.log("Clearing existing collections in ili_languages_indore...");
  await Promise.all([
    CourseModel.deleteMany({}),
    UserModel.deleteMany({}),
    StudentModel.deleteMany({}),
    LeadModel.deleteMany({}),
    OrderModel.deleteMany({}),
    SettingsModel.deleteMany({}),
  ]);

  // Insert seed data
  console.log(`Inserting ${initialCourses.length} courses...`);
  await CourseModel.insertMany(initialCourses);

  console.log(`Inserting ${initialUsers.length} users (Admin & Students)...`);
  await UserModel.insertMany(initialUsers);

  console.log(`Inserting ${initialStudents.length} students...`);
  await StudentModel.insertMany(initialStudents);

  console.log(`Inserting ${initialLeads.length} leads...`);
  await LeadModel.insertMany(initialLeads);

  console.log(`Inserting ${initialOrders.length} orders...`);
  await OrderModel.insertMany(initialOrders);

  console.log("Inserting institute settings...");
  await SettingsModel.create({
    ...initialInstituteSettings,
    bunnyLibraryId: process.env.BUNNY_STREAM_LIBRARY_ID || "",
    bunnyApiKey: process.env.BUNNY_STREAM_API_KEY || "",
    bunnyPullZone: process.env.BUNNY_STREAM_PULL_ZONE || "",
  });

  console.log("\n=================================================");
  console.log("🎉 SUCCESS: MongoDB Atlas database seeded cleanly!");
  console.log(`Courses: ${await CourseModel.countDocuments()}`);
  console.log(`Users: ${await UserModel.countDocuments()}`);
  console.log(`Students: ${await StudentModel.countDocuments()}`);
  console.log(`Leads: ${await LeadModel.countDocuments()}`);
  console.log(`Orders: ${await OrderModel.countDocuments()}`);
  console.log(`Settings: ${await SettingsModel.countDocuments()}`);
  console.log("=================================================\n");

  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
