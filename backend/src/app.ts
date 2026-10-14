import express from "express";
import { corsMiddleware } from "./middleware/cors";
import { errorHandler } from "./middleware/errorHandler";
import apiRouter from "./routes";

export const app = express();

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS policy
app.use(corsMiddleware);

// Mount API routes
app.use("/api", apiRouter);

// Root informational endpoint
app.get("/", (_req, res) => {
  res.json({
    name: "ILI Foreign Languages Institute — Backend API",
    location: "Apollo Tower, MG Road, New Palasia, Indore, India",
    status: "online",
    apiDocumentation: "/api/health",
  });
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Resource or API route not found",
  });
});

// Error handling middleware
app.use(errorHandler);
