import { Response } from "express";
import { OrderService } from "../services/orderService";
import { sendSuccess, sendError } from "../utils/response";
import { AuthenticatedRequest } from "../middleware/auth";

export class OrderController {
  static getAllOrders(_req: AuthenticatedRequest, res: Response): void {
    const orders = OrderService.getAllOrders();
    sendSuccess(res, orders);
  }

  static createOrder(req: AuthenticatedRequest, res: Response): void {
    const { courseId, courseTitle, amount, paymentMethod } = req.body;

    if (!courseId || !amount) {
      sendError(res, "Course ID and amount are required", 400);
      return;
    }

    const studentName = req.user?.name || req.body.studentName || "Student";
    const studentEmail = req.user?.email || req.body.studentEmail || "student@ililanguages.in";

    const order = OrderService.createOrder({
      studentName,
      studentEmail,
      courseId,
      courseTitle: courseTitle || "Language Course",
      amount,
      paymentMethod,
    });

    sendSuccess(res, order, 201);
  }
}
