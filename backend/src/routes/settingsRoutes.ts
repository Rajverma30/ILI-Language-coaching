import { Router } from "express";
import { SettingsController } from "../controllers/settingsController";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", SettingsController.getSettings);
router.put("/", requireAdmin, SettingsController.updateSettings);

export default router;
