import { store } from "../models/store";
import { Student } from "../models/types";

export class StudentService {
  static getAllStudents(): Student[] {
    return store.getAllStudents();
  }

  static getStudentById(id: string): Student | undefined {
    return store.getStudentById(id);
  }

  static getStudentByEmail(email: string): Student | undefined {
    return store.getStudentByEmail(email);
  }

  static getStudentCourseProgress(studentId: string, courseId: string) {
    const student = store.getStudentById(studentId);
    const course = store.getCourseById(courseId);

    const totalLectures = (course?.sections || []).reduce(
      (acc, s) => acc + (s.lectures?.length || 0),
      0
    ) || 1;

    const completedIds = student?.progress?.[courseId]?.completedLectureIds || [];
    const completedCount = completedIds.length;
    const percentage = Math.min(100, Math.round((completedCount / totalLectures) * 100));

    return {
      percentage,
      completedCount,
      totalLectures,
      completedLectureIds: completedIds,
      isCompleted: (lecId: string) => completedIds.includes(lecId),
    };
  }

  static markLectureCompleted(
    studentId: string,
    courseId: string,
    lectureId: string
  ): Student | undefined {
    return store.markLectureCompleted(studentId, courseId, lectureId);
  }
}
