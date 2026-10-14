import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:3000,http://localhost:3001")
    .split(",")
    .map((origin) => origin.trim()),
  jwt: {
    secret: process.env.JWT_SECRET || "ili_jwt_secure_key_change_in_production_2026",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  mongodb: {
    uri: process.env.MONGODB_URI || "",
    dbName: process.env.MONGODB_DB_NAME || "ili_languages_indore",
  },
  bunnyStream: {
    libraryId: process.env.BUNNY_STREAM_LIBRARY_ID || "",
    apiKey: process.env.BUNNY_STREAM_API_KEY || "",
    tokenAuthKey: process.env.BUNNY_STREAM_TOKEN_AUTH_KEY || "",
    pullZone: process.env.BUNNY_STREAM_PULL_ZONE || "",
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || "",
    keySecret: process.env.RAZORPAY_KEY_SECRET || "",
  },
  whatsapp: {
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || "",
    accessToken: process.env.WHATSAPP_SYSTEM_USER_ACCESS_TOKEN || "",
    templateName: process.env.WHATSAPP_DEMO_TEMPLATE_NAME || "ili_demo_confirmation_indore",
  },
  ultraMsg: {
    instanceId: process.env.ULTRAMSG_INSTANCE_ID || "",
    token: process.env.ULTRAMSG_TOKEN || "",
    adminPhone: process.env.ADMIN_WHATSAPP_PHONE || "+919826012345",
    enabled: process.env.ULTRAMSG_ENABLED !== "false",
  },
};
