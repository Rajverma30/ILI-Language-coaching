import { Router } from "express";
import authRoutes from "./authRoutes";
import courseRoutes from "./courseRoutes";
import studentRoutes from "./studentRoutes";
import leadRoutes from "./leadRoutes";
import orderRoutes from "./orderRoutes";
import settingsRoutes from "./settingsRoutes";
import integrationRoutes from "./integrationRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/students", studentRoutes);
router.use("/leads", leadRoutes);
router.use("/orders", orderRoutes);
router.use("/settings", settingsRoutes);
router.use("/integrations", integrationRoutes);

// Health check endpoint
router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "ILI Languages Centralized Backend API",
    campus: "Apollo Tower, New Palasia, Indore, India",
    timestamp: new Date().toISOString(),
  });
});

export default router;
