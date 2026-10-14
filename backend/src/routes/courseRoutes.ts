import { Router } from "express";
import { CourseController } from "../controllers/courseController";
import { requireAdmin } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/", CourseController.getAllCourses);
router.get("/slug/:slug", CourseController.getCourseBySlug);
router.get("/:id", CourseController.getCourseById);

// Admin protected routes
router.post("/", requireAdmin, CourseController.createCourse);
router.put("/:id", requireAdmin, CourseController.updateCourse);
router.delete("/:id", requireAdmin, CourseController.deleteCourse);

router.post("/:id/sections", requireAdmin, CourseController.addSection);
router.delete("/:id/sections/:sectionId", requireAdmin, CourseController.deleteSection);

router.post("/:id/sections/:sectionId/lectures", requireAdmin, CourseController.addLecture);
router.delete("/:id/sections/:sectionId/lectures/:lectureId", requireAdmin, CourseController.deleteLecture);

export default router;
