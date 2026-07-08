/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Course, Submission, EnrollmentRequest, Announcement, ScheduleEvent, Receipt, Diploma, AwardedDiploma } from './types';
import { mockUsers, mockCourses, mockEnrollmentRequests, mockSubmissions, mockAnnouncements, mockSchedules, mockReceipts, mockDiplomas, mockAwardedDiplomas } from './data/mockData';

// Component Imports
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { AdminDashboard } from './components/AdminDashboard';
import { TrainerDashboard } from './components/TrainerDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { AuthModal } from './components/AuthModal';
import { StudentLogin } from './components/StudentLogin';
import { TrainerLogin } from './components/TrainerLogin';
import { AdminLogin } from './components/AdminLogin';

export default function App() {
  // App States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollmentRequests, setEnrollmentRequests] = useState<EnrollmentRequest[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [schedules, setSchedules] = useState<ScheduleEvent[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);
  const [awardedDiplomas, setAwardedDiplomas] = useState<AwardedDiploma[]>([]);

  // Navigation and UI states
  const [activeTab, setActiveTab] = useState<'home' | 'student' | 'trainer' | 'admin'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Initialize and load from LocalStorage
  useEffect(() => {
    // Users
    const localUsers = localStorage.getItem('cfa_users');
    if (localUsers) {
      setUsers(JSON.parse(localUsers));
    } else {
      setUsers(mockUsers);
      localStorage.setItem('cfa_users', JSON.stringify(mockUsers));
    }

    // Courses
    const localCourses = localStorage.getItem('cfa_courses');
    if (localCourses) {
      const parsed = JSON.parse(localCourses);
      // Automatically merge any default mock courses that aren't already in the local storage
      const missingMockCourses = mockCourses.filter(mock => !parsed.some((c: any) => c.id === mock.id));
      if (missingMockCourses.length > 0) {
        const updated = [...parsed, ...missingMockCourses];
        setCourses(updated);
        localStorage.setItem('cfa_courses', JSON.stringify(updated));
      } else {
        setCourses(parsed);
      }
    } else {
      setCourses(mockCourses);
      localStorage.setItem('cfa_courses', JSON.stringify(mockCourses));
    }

    // Enrollment Requests
    const localRequests = localStorage.getItem('cfa_enrollment_requests');
    if (localRequests) {
      setEnrollmentRequests(JSON.parse(localRequests));
    } else {
      setEnrollmentRequests(mockEnrollmentRequests);
      localStorage.setItem('cfa_enrollment_requests', JSON.stringify(mockEnrollmentRequests));
    }

    // Submissions
    const localSubmissions = localStorage.getItem('cfa_submissions');
    if (localSubmissions) {
      setSubmissions(JSON.parse(localSubmissions));
    } else {
      setSubmissions(mockSubmissions);
      localStorage.setItem('cfa_submissions', JSON.stringify(mockSubmissions));
    }

    // Announcements
    const localAnnouncements = localStorage.getItem('cfa_announcements');
    if (localAnnouncements) {
      setAnnouncements(JSON.parse(localAnnouncements));
    } else {
      setAnnouncements(mockAnnouncements);
      localStorage.setItem('cfa_announcements', JSON.stringify(mockAnnouncements));
    }

    // Schedules
    const localSchedules = localStorage.getItem('cfa_schedules');
    if (localSchedules) {
      setSchedules(JSON.parse(localSchedules));
    } else {
      setSchedules(mockSchedules);
      localStorage.setItem('cfa_schedules', JSON.stringify(mockSchedules));
    }

    // Receipts
    const localReceipts = localStorage.getItem('cfa_receipts');
    if (localReceipts) {
      setReceipts(JSON.parse(localReceipts));
    } else {
      setReceipts(mockReceipts);
      localStorage.setItem('cfa_receipts', JSON.stringify(mockReceipts));
    }

    // Diplomas
    const localDiplomas = localStorage.getItem('cfa_diplomas');
    if (localDiplomas) {
      const parsed = JSON.parse(localDiplomas);
      const missingMockDiplomas = mockDiplomas.filter(mock => !parsed.some((d: any) => d.id === mock.id));
      if (missingMockDiplomas.length > 0) {
        const updated = [...parsed, ...missingMockDiplomas];
        setDiplomas(updated);
        localStorage.setItem('cfa_diplomas', JSON.stringify(updated));
      } else {
        setDiplomas(parsed);
      }
    } else {
      setDiplomas(mockDiplomas);
      localStorage.setItem('cfa_diplomas', JSON.stringify(mockDiplomas));
    }

    // Awarded Diplomas
    const localAwarded = localStorage.getItem('cfa_awarded_diplomas');
    if (localAwarded) {
      setAwardedDiplomas(JSON.parse(localAwarded));
    } else {
      setAwardedDiplomas(mockAwardedDiplomas);
      localStorage.setItem('cfa_awarded_diplomas', JSON.stringify(mockAwardedDiplomas));
    }
  }, []);

  // Sync to LocalStorage helpers
  const saveUsers = (updated: User[]) => {
    setUsers(updated);
    localStorage.setItem('cfa_users', JSON.stringify(updated));
  };

  const saveAwardedDiplomas = (updated: AwardedDiploma[]) => {
    setAwardedDiplomas(updated);
    localStorage.setItem('cfa_awarded_diplomas', JSON.stringify(updated));
  };

  const saveCourses = (updated: Course[]) => {
    setCourses(updated);
    localStorage.setItem('cfa_courses', JSON.stringify(updated));
  };

  const saveEnrollments = (updated: EnrollmentRequest[]) => {
    setEnrollmentRequests(updated);
    localStorage.setItem('cfa_enrollment_requests', JSON.stringify(updated));
  };

  const saveSubmissions = (updated: Submission[]) => {
    setSubmissions(updated);
    localStorage.setItem('cfa_submissions', JSON.stringify(updated));
  };

  const saveAnnouncements = (updated: Announcement[]) => {
    setAnnouncements(updated);
    localStorage.setItem('cfa_announcements', JSON.stringify(updated));
  };

  const saveSchedules = (updated: ScheduleEvent[]) => {
    setSchedules(updated);
    localStorage.setItem('cfa_schedules', JSON.stringify(updated));
  };

  const saveReceipts = (updated: Receipt[]) => {
    setReceipts(updated);
    localStorage.setItem('cfa_receipts', JSON.stringify(updated));
  };

  const saveDiplomas = (updated: Diploma[]) => {
    setDiplomas(updated);
    localStorage.setItem('cfa_diplomas', JSON.stringify(updated));
  };

  // Event Handlers
  const handleSelectUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      if (user.role === 'admin') {
        setActiveTab('admin');
      } else if (user.role === 'trainer') {
        setActiveTab('trainer');
      } else if (user.role === 'student') {
        setActiveTab('student');
      }
    } else {
      setActiveTab('home');
    }
  };

  const handleApplyForCourse = (courseId: string) => {
    if (!currentUser || currentUser.role !== 'student') {
      setIsAuthModalOpen(true);
      return;
    }

    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    // Check if request already exists
    const exists = enrollmentRequests.some(
      (r) => r.courseId === courseId && r.studentId === currentUser.id
    );
    if (exists) return;

    const newRequest: EnrollmentRequest = {
      id: `req-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      courseId: courseId,
      courseTitle: course.title,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    const updated = [newRequest, ...enrollmentRequests];
    saveEnrollments(updated);
  };

  // Admin handlers
  const handleApproveCourse = (courseId: string) => {
    const updated = courses.map((c) => (c.id === courseId ? { ...c, status: 'approved' as const } : c));
    saveCourses(updated);
  };

  const handleRejectCourse = (courseId: string) => {
    const updated = courses.map((c) => (c.id === courseId ? { ...c, status: 'rejected' as const } : c));
    saveCourses(updated);
  };

  const handleApproveEnrollment = (requestId: string) => {
    const req = enrollmentRequests.find((r) => r.id === requestId);
    if (!req) return;

    // Set request as approved
    const updatedRequests = enrollmentRequests.map((r) =>
      r.id === requestId ? { ...r, status: 'approved' as const } : r
    );
    saveEnrollments(updatedRequests);

    // Increment enrolledCount of that course
    const updatedCourses = courses.map((c) =>
      c.id === req.courseId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c
    );
    saveCourses(updatedCourses);
  };

  const handleRejectEnrollment = (requestId: string) => {
    const updated = enrollmentRequests.map((r) =>
      r.id === requestId ? { ...r, status: 'rejected' as const } : r
    );
    saveEnrollments(updated);
  };

  const handleAddUser = (newUser: User) => {
    const updated = [...users, newUser];
    saveUsers(updated);
  };

  const handleDeleteUser = (userId: string) => {
    const updated = users.filter((u) => u.id !== userId);
    saveUsers(updated);
  };

  const handleAddAnnouncement = (newAnn: Announcement) => {
    const updated = [newAnn, ...announcements];
    saveAnnouncements(updated);
  };

  // Trainer Handlers
  const handleAddCourse = (newCourse: Course) => {
    const updated = [newCourse, ...courses];
    saveCourses(updated);
  };

  const handleGradeSubmission = (submissionId: string, grade: number, feedback: string) => {
    const updated = submissions.map((sub) =>
      sub.id === submissionId
        ? { ...sub, status: 'graded' as const, grade, feedback }
        : sub
    );
    saveSubmissions(updated);
  };

  // Student Handlers
  const handleAddSubmission = (newSubmission: Submission) => {
    const updated = [newSubmission, ...submissions];
    saveSubmissions(updated);
  };

  const handleUpdateUser = (updatedUser: User) => {
    const updatedUsers = users.map((u) => u.id === updatedUser.id ? updatedUser : u);
    saveUsers(updatedUsers);
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  // Render active tab content
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            courses={courses}
            currentUser={currentUser}
            enrollmentRequests={enrollmentRequests}
            onApplyForCourse={handleApplyForCourse}
            onNavigateToDashboard={() => {
              if (currentUser) {
                if (currentUser.role === 'student') setActiveTab('student');
                else if (currentUser.role === 'trainer') setActiveTab('trainer');
                else if (currentUser.role === 'admin') setActiveTab('admin');
              } else {
                setActiveTab('student'); // Default to student space if visitor
              }
            }}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        );
      case 'student':
        if (currentUser && currentUser.role === 'student') {
          return (
            <StudentDashboard
              currentUser={currentUser}
              courses={courses}
              submissions={submissions}
              announcements={announcements}
              schedules={schedules}
              receipts={receipts}
              awardedDiplomas={awardedDiplomas}
              onAddSubmission={handleAddSubmission}
              onUpdateUser={handleUpdateUser}
            />
          );
        }
        return (
          <StudentLogin
            allUsers={users}
            onLogin={handleSelectUser}
            onRegisterUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
          />
        );
      case 'trainer':
        if (currentUser && currentUser.role === 'trainer') {
          return (
            <TrainerDashboard
              currentUser={currentUser}
              courses={courses}
              submissions={submissions}
              onAddCourse={handleAddCourse}
              onGradeSubmission={handleGradeSubmission}
              onUpdateUser={handleUpdateUser}
            />
          );
        }
        return (
          <TrainerLogin
            allUsers={users}
            onLogin={handleSelectUser}
            onRegisterUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
          />
        );
      case 'admin':
        if (currentUser && currentUser.role === 'admin') {
          return (
            <AdminDashboard
              courses={courses}
              allUsers={users}
              enrollmentRequests={enrollmentRequests}
              announcements={announcements}
              diplomas={diplomas}
              schedules={schedules}
              receipts={receipts}
              awardedDiplomas={awardedDiplomas}
              onSaveDiplomas={saveDiplomas}
              onSaveSchedules={saveSchedules}
              onSaveReceipts={saveReceipts}
              onSaveAwardedDiplomas={saveAwardedDiplomas}
              onApproveCourse={handleApproveCourse}
              onRejectCourse={handleRejectCourse}
              onApproveEnrollment={handleApproveEnrollment}
              onRejectEnrollment={handleRejectEnrollment}
              onAddUser={handleAddUser}
              onDeleteUser={handleDeleteUser}
              onAddAnnouncement={handleAddAnnouncement}
            />
          );
        }
        return <AdminLogin allUsers={users} onLogin={handleSelectUser} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Primary Navigation */}
      <Navigation
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Stage */}
      <main className="flex-1">
        <div className="py-6">
          {renderActiveTabContent()}
        </div>
      </main>

      {/* Authentication Dialog for Guest Signup */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        allUsers={users}
        onLogin={handleSelectUser}
        onRegisterUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}
