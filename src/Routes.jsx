import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VotingInterface from './pages/voting-interface';
import AdminDashboard from './pages/admin-dashboard';
import StudentAuthentication from './pages/student-authentication';
import VoteConfirmation from './pages/vote-confirmation';
import StudentManagement from './pages/student-management';
import ResultsDashboard from './pages/results-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/voting-interface" element={<VotingInterface />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-authentication" element={<StudentAuthentication />} />
        <Route path="/vote-confirmation" element={<VoteConfirmation />} />
        <Route path="/student-management" element={<StudentManagement />} />
        <Route path="/results-dashboard" element={<ResultsDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
