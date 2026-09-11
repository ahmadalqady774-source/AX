import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { checkAndUpdateStreak } from './lib/profile';
import { AuthProvider } from './lib/authContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Paths from './pages/Paths';
import AcademicPathways from './pages/AcademicPathways';
import Community from './pages/Community';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import CourseDetail from './pages/CourseDetail';
import CourseLectures from './pages/CourseLectures';
import Courses from './pages/Courses';
import LectureAnalyzer from './pages/LectureAnalyzer';
import CompetitionHub from './pages/CompetitionHub';
import PlacementCatchUp from './pages/PlacementCatchUp';
import Onboarding from './pages/Onboarding';
import YearSelection from './pages/YearSelection';
import PathSelection from './pages/PathSelection';
import Summaries from './pages/Summaries';
import Calendar from './pages/Calendar';
import Assessment from './pages/Assessment';
import InteractivePlayer from './pages/InteractivePlayer';
import AdminPortal from './pages/AdminPortal';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Users from './pages/Users';
import Schedules from './pages/Schedules';
import Trash from './pages/Trash';
import { AuthModal } from './components/AuthModal';
import { AcademicProfileSetupModal } from './components/AcademicProfileSetupModal';
import { useAuth } from './lib/authContext';

import { Toaster } from 'sonner';

function GlobalAuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode } = useAuth();
  return <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialMode={authModalMode} />;
}

function GlobalAcademicProfileSetupGuard() {
  const { currentUser, userProfile, isFirstTimeSetupOpen, isUserAdmin } = useAuth();
  
  // Strict Admin Bypass: Administrator account is NEVER prompted for setup
  if (!currentUser || isUserAdmin || currentUser.email === 'ahmadalqady774@gmail.com' || userProfile?.role === 'ADMIN' || userProfile?.role === 'SUPER_ADMIN') {
    return null;
  }

  if (!isFirstTimeSetupOpen) {
    return null;
  }

  return <AcademicProfileSetupModal isOpen={true} />;
}

function LocationTracker() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/' && !['/onboarding', '/year-selection', '/path-selection'].includes(location.pathname)) {
      localStorage.setItem('lastVisitedLocation', location.pathname + location.search + location.hash);
    }
  }, [location]);
  return null;
}

function InitialRedirect() {
  const lastLocation = localStorage.getItem('lastVisitedLocation');
  return <Navigate to={lastLocation || '/dashboard'} replace />;
}

export default function App() {
  useEffect(() => {
    checkAndUpdateStreak();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <LocationTracker />
        <Toaster position="top-center" expand={true} richColors />
        <GlobalAuthModal />
        <GlobalAcademicProfileSetupGuard />
        <Routes>
          {/* Onboarding Flow */}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/year-selection" element={<YearSelection />} />
          <Route path="/path-selection" element={<PathSelection />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<InitialRedirect />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="schedules" element={<Schedules />} />
            <Route path="paths" element={<Paths />} />
            <Route path="paths/:id" element={<AcademicPathways />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course/:id/lectures" element={<CourseLectures />} />
            <Route path="course/:id" element={<CourseLectures />} />
            <Route path="course/:id/lecture/:lectureId" element={<CourseDetail />} />
            <Route path="lesson-player/:id" element={<InteractivePlayer />} />
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="summaries" element={<Summaries />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="assessment" element={<Assessment />} />
            <Route path="lecture-analyzer" element={<LectureAnalyzer />} />
            <Route path="competitions" element={<CompetitionHub />} />
            <Route path="placement-test" element={<PlacementCatchUp />} />
            <Route path="admin" element={<AdminPortal />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctor/:id" element={<DoctorDetail />} />
            <Route path="users" element={<Users />} />
            <Route path="trash" element={<Trash />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
