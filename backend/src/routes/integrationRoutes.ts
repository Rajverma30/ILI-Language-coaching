import { Router } from "express";
import { IntegrationController } from "../controllers/integrationController";
import { requireAuth, optionalAuth } from "../middleware/auth";

const router = Router();

// Bunny Stream endpoints
router.get("/bunny/embed/:videoId", requireAuth, IntegrationController.getBunnyStreamEmbed);
router.post("/bunny/create-slot", requireAuth, IntegrationController.createBunnyVideoSlot);
router.get("/bunny/test", requireAuth, IntegrationController.testBunnyConnection);

// Razorpay checkout endpoints
router.post("/razorpay/create-order", optionalAuth, IntegrationController.createRazorpayOrder);
router.post("/razorpay/verify", optionalAuth, IntegrationController.verifyRazorpaySignature);

// WhatsApp notification trigger
router.post("/whatsapp/notify", requireAuth, IntegrationController.sendWhatsAppNotification);

// UltraMsg WhatsApp live test endpoint
router.post("/ultramsg/test", IntegrationController.testUltraMsg);

export default router;
