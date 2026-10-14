import cors from "cors";
import { config } from "../config";

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (such as mobile apps, curl, or same-origin server requests)
    if (!origin) return callback(null, true);

    // Allow configured origins or wildcard
    if (config.corsOrigins.includes("*") || config.corsOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow all vercel.app domains (production & preview branch deployments)
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    // Allow localhost origins for development
    if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
      return callback(null, true);
    }

    return callback(new Error(`CORS policy violation: origin ${origin} is not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
});
