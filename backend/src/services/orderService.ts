import { store } from "../models/store";
import { Order } from "../models/types";

export class OrderService {
  static getAllOrders(): Order[] {
    return store.getAllOrders();
  }

  static createOrder(data: {
    studentName: string;
    studentEmail: string;
    courseId: string;
    courseTitle: string;
    amount: number;
    paymentMethod?: string;
  }): Order {
    return store.createOrder(data);
  }
}
