import { Response } from "express";
import { StudentService } from "../services/studentService";
import { sendSuccess, sendError } from "../utils/response";
import { AuthenticatedRequest } from "../middleware/auth";

export class StudentController {
  static getAllStudents(_req: AuthenticatedRequest, res: Response): void {
    const students = StudentService.getAllStudents();
    sendSuccess(res, students);
  }

  static getStudentById(req: AuthenticatedRequest, res: Response): void {
    const id = req.params.id as string;
    
    // Students can only view their own profile unless admin
    if (req.user?.role === "student" && req.user.id !== id) {
      sendError(res, "Access denied. You can only view your own student record.", 403);
      return;
    }

    const student = StudentService.getStudentById(id);
    if (!student) {
      sendError(res, "Student not found", 404);
      return;
    }
    sendSuccess(res, student);
  }

  static getProgress(req: AuthenticatedRequest, res: Response): void {
    const id = req.params.id as string;
    const courseId = req.params.courseId as string;

    if (req.user?.role === "student" && req.user.id !== id) {
      sendError(res, "Access denied", 403);
      return;
    }

    const progress = StudentService.getStudentCourseProgress(id, courseId);
    sendSuccess(res, progress);
  }

  static markLectureCompleted(req: AuthenticatedRequest, res: Response): void {
    const id = req.params.id as string;
    const courseId = req.params.courseId as string;
    const { lectureId } = req.body;

    if (!lectureId) {
      sendError(res, "lectureId is required", 400);
      return;
    }

    if (req.user?.role === "student" && req.user.id !== id) {
      sendError(res, "Access denied", 403);
      return;
    }

    const updated = StudentService.markLectureCompleted(id, courseId, lectureId);
    if (!updated) {
      sendError(res, "Student not found", 404);
      return;
    }

    const progress = StudentService.getStudentCourseProgress(id, courseId);
    sendSuccess(res, progress);
  }
}
