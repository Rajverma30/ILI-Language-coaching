import { store } from "../models/store";
import { Course, CourseSection, Lecture } from "../models/types";

export class CourseService {
  static getAllCourses(): Course[] {
    return store.getAllCourses();
  }

  static getCourseById(id: string): Course | undefined {
    return store.getCourseById(id);
  }

  static getCourseBySlug(slug: string): Course | undefined {
    return store.getCourseBySlug(slug);
  }

  static createCourse(
    courseData: Omit<Course, "id" | "totalLectures" | "enrolledStudentsCount" | "sections">
  ): Course {
    return store.createCourse(courseData);
  }

  static updateCourse(id: string, updates: Partial<Course>): Course | undefined {
    return store.updateCourse(id, updates);
  }

  static deleteCourse(id: string): boolean {
    return store.deleteCourse(id);
  }

  static addSection(courseId: string, title: string): CourseSection | undefined {
    return store.addSection(courseId, title);
  }

  static deleteSection(courseId: string, sectionId: string): boolean {
    return store.deleteSection(courseId, sectionId);
  }

  static addLecture(
    courseId: string,
    sectionId: string,
    lectureData: Omit<Lecture, "id" | "order">
  ): Lecture | undefined {
    return store.addLecture(courseId, sectionId, lectureData);
  }

  static deleteLecture(courseId: string, sectionId: string, lectureId: string): boolean {
    return store.deleteLecture(courseId, sectionId, lectureId);
  }
}
