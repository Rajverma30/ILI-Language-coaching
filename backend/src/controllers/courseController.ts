import { Request, Response } from "express";
import { CourseService } from "../services/courseService";
import { sendSuccess, sendError } from "../utils/response";

export class CourseController {
  static getAllCourses(_req: Request, res: Response): void {
    const courses = CourseService.getAllCourses();
    sendSuccess(res, courses);
  }

  static getCourseById(req: Request, res: Response): void {
    const id = req.params.id as string;
    const course = CourseService.getCourseById(id);
    if (!course) {
      sendError(res, "Course not found", 404);
      return;
    }
    sendSuccess(res, course);
  }

  static getCourseBySlug(req: Request, res: Response): void {
    const slug = req.params.slug as string;
    const course = CourseService.getCourseBySlug(slug);
    if (!course) {
      sendError(res, "Course not found", 404);
      return;
    }
    sendSuccess(res, course);
  }

  static createCourse(req: Request, res: Response): void {
    const courseData = req.body;
    if (!courseData.title || !courseData.language || !courseData.level) {
      sendError(res, "Title, language, and level are required fields.", 400);
      return;
    }
    const created = CourseService.createCourse(courseData);
    sendSuccess(res, created, 201);
  }

  static updateCourse(req: Request, res: Response): void {
    const id = req.params.id as string;
    const updates = req.body;
    const updated = CourseService.updateCourse(id, updates);
    if (!updated) {
      sendError(res, "Course not found", 404);
      return;
    }
    sendSuccess(res, updated);
  }

  static deleteCourse(req: Request, res: Response): void {
    const id = req.params.id as string;
    const success = CourseService.deleteCourse(id);
    if (!success) {
      sendError(res, "Course not found", 404);
      return;
    }
    sendSuccess(res, { deleted: true });
  }

  static addSection(req: Request, res: Response): void {
    const id = req.params.id as string;
    const { title } = req.body;
    if (!title) {
      sendError(res, "Section title is required", 400);
      return;
    }
    const section = CourseService.addSection(id, title);
    if (!section) {
      sendError(res, "Course not found", 404);
      return;
    }
    sendSuccess(res, section, 201);
  }

  static deleteSection(req: Request, res: Response): void {
    const id = req.params.id as string;
    const sectionId = req.params.sectionId as string;
    const success = CourseService.deleteSection(id, sectionId);
    if (!success) {
      sendError(res, "Course or section not found", 404);
      return;
    }
    sendSuccess(res, { deleted: true });
  }

  static addLecture(req: Request, res: Response): void {
    const id = req.params.id as string;
    const sectionId = req.params.sectionId as string;
    const lectureData = req.body;
    if (!lectureData.title || !lectureData.duration) {
      sendError(res, "Lecture title and duration are required", 400);
      return;
    }
    const lecture = CourseService.addLecture(id, sectionId, lectureData);
    if (!lecture) {
      sendError(res, "Course or section not found", 404);
      return;
    }
    sendSuccess(res, lecture, 201);
  }

  static deleteLecture(req: Request, res: Response): void {
    const id = req.params.id as string;
    const sectionId = req.params.sectionId as string;
    const lectureId = req.params.lectureId as string;
    const success = CourseService.deleteLecture(id, sectionId, lectureId);
    if (!success) {
      sendError(res, "Course, section, or lecture not found", 404);
      return;
    }
    sendSuccess(res, { deleted: true });
  }
}
