import cors from "cors";
import { config } from "../config";

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (such as mobile apps, curl, or same-origin server requests)
    if (!origin) return callback(null, true);

    if (config.corsOrigins.includes(origin)) {
      return callback(null, true);
    }

    // In development mode, allow localhost origins
    if (config.nodeEnv === "development" && origin.startsWith("http://localhost:")) {
      return callback(null, true);
    }

    return callback(new Error(`CORS policy violation: origin ${origin} is not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
});
