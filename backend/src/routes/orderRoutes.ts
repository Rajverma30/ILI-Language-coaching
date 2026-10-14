import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { requireAdmin, requireStudent } from "../middleware/auth";

const router = Router();

router.get("/", requireAdmin, OrderController.getAllOrders);
router.post("/", requireStudent, OrderController.createOrder);

export default router;
