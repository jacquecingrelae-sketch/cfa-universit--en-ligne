/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'guest' | 'admin' | 'trainer' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialty?: string; // For trainers
  bio?: string;
  registrationDate: string;
  password?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "45 min"
  content: string; // Course text/content
  videoUrl?: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string; // e.g., "Finance", "Management", "Marketing", "Technologie"
  duration: string; // e.g., "40 heures"
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  trainerId: string;
  trainerName: string;
  rating: number;
  image: string;
  price: number; // e.g., 0 for CFA-funded or commercial value
  status: 'approved' | 'pending' | 'rejected';
  lessons: Lesson[];
  quizzes?: Quiz[];
  enrolledCount: number;
}

export interface EnrollmentRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CourseProgress {
  courseId: string;
  completedLessonIds: string[];
  quizScore?: number; // Score achieved on quizzes
  status: 'not_started' | 'ongoing' | 'completed';
}

export interface Submission {
  id: string;
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  studentId: string;
  studentName: string;
  submissionDate: string;
  textResponse: string;
  status: 'pending' | 'graded';
  grade?: number; // Score out of 20 (French notation scale)
  feedback?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: 'Général' | 'Examen' | 'Système';
}

export interface ScheduleEvent {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g., "09:00"
  endTime: string; // e.g., "12:00"
  trainerName: string;
  room: string; // e.g., "Salle A10" or "Visioconférence Teams"
  type: 'Cours' | 'Examen' | 'TP' | 'Workshop';
}

export interface Receipt {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  paymentMethod: string; // e.g. "OPCO Atlas", "MonCompteFormation (CPF)", "Financement Régional"
  date: string;
  status: 'payé' | 'en_attente' | 'partiel';
  transactionId: string;
}

export interface Diploma {
  id: string;
  title: string;
  level: string; // e.g., "Bac +3 (Niveau 6)", "Bac +5 (Niveau 7)"
  rncpCode: string; // e.g., "RNCP34852"
  description: string;
  credits: number; // ECTS credits, e.g., 60, 120, 180
  category: string; // e.g., "Finance", "Management", "Digital"
}

export interface AwardedDiploma {
  id: string;
  studentId: string;
  studentName: string;
  diplomaId: string;
  diplomaTitle: string;
  courseId: string;
  courseTitle: string;
  dateAwarded: string;
  rncpCode: string;
  level: string;
}


