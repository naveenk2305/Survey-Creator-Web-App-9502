import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';
import Header from './components/Header';
import SurveyList from './components/SurveyList';
import SurveyBuilder from './components/SurveyBuilder';
import SurveyPreview from './components/SurveyPreview';
import GetStartedPage from './pages/GetStartedPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import ProtectedRoute from './components/ProtectedRoute';
import { SurveyProvider } from './context/SurveyContext';
import { AuthProvider } from './context/AuthContext';
import { questConfig } from './config/questConfig';
import './App.css';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <AuthProvider>
        <SurveyProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              
              {/* Protected Routes */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                      <Header />
                      <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="container mx-auto px-4 py-8"
                      >
                        <Routes>
                          <Route path="/" element={<SurveyList />} />
                          <Route path="/create" element={<SurveyBuilder />} />
                          <Route path="/edit/:id" element={<SurveyBuilder />} />
                          <Route path="/preview/:id" element={<SurveyPreview />} />
                          <Route path="/get-started" element={<GetStartedPage />} />
                        </Routes>
                      </motion.main>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </SurveyProvider>
      </AuthProvider>
    </QuestProvider>
  );
}

export default App;