import { Router } from "express";
import { StudentController } from "../controllers/studentController";
import { requireAdmin, requireStudent } from "../middleware/auth";

const router = Router();

// Admin only: list all students
router.get("/", requireAdmin, StudentController.getAllStudents);

// Student or Admin: get student profile
router.get("/:id", requireStudent, StudentController.getStudentById);

// Student or Admin: progress inspection & completion tracking
router.get("/:id/progress/:courseId", requireStudent, StudentController.getProgress);
router.post("/:id/progress/:courseId/complete", requireStudent, StudentController.markLectureCompleted);

export default router;
