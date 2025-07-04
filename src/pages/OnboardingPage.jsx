import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OnBoarding } from '@questlabs/react-sdk';
import { questConfig } from '../config/questConfig';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiRocket, FiTarget, FiStar, FiCheckCircle } = FiIcons;

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    
    if (!storedUserId || !storedToken) {
      navigate('/login');
      return;
    }
    
    setUserId(storedUserId);
    setToken(storedToken);
  }, [navigate]);

  const getAnswers = () => {
    // Navigate to main app after onboarding completion
    navigate('/');
  };

  if (!userId || !token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Section - Welcome & Branding */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <SafeIcon icon={FiRocket} className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Welcome Aboard!</h1>
                    <p className="text-green-100">Let's get you started</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    Let's Set Up Your
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                      Survey Experience
                    </span>
                  </h2>
                  
                  <p className="text-xl text-blue-100 leading-relaxed">
                    We'll customize your dashboard and recommendations based on your preferences and goals.
                  </p>

                  <div className="space-y-4 mt-8">
                    <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <SafeIcon icon={FiTarget} className="w-6 h-6 text-yellow-300" />
                      <div>
                        <h3 className="font-semibold">Personalized Setup</h3>
                        <p className="text-sm text-blue-100">Tailored to your needs</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <SafeIcon icon={FiStar} className="w-6 h-6 text-green-300" />
                      <div>
                        <h3 className="font-semibold">Best Practices</h3>
                        <p className="text-sm text-blue-100">Expert recommendations</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <SafeIcon icon={FiCheckCircle} className="w-6 h-6 text-purple-300" />
                      <div>
                        <h3 className="font-semibold">Quick Start</h3>
                        <p className="text-sm text-blue-100">Ready in minutes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Section - Onboarding Component */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center"
            >
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Getting Started
                  </h2>
                  <p className="text-gray-600">
                    Help us understand your survey goals and preferences
                  </p>
                </div>

                <div className="quest-onboarding-container" style={{ width: '400px', margin: '0 auto' }}>
                  <OnBoarding
                    userId={userId}
                    token={token}
                    questId={questConfig.QUEST_ONBOARDING_QUESTID}
                    answer={answers}
                    setAnswer={setAnswers}
                    getAnswers={getAnswers}
                    accent={questConfig.PRIMARY_COLOR}
                    singleChoose="modal1"
                    multiChoice="modal2"
                  >
                    <OnBoarding.Header />
                    <OnBoarding.Content />
                    <OnBoarding.Footer />
                  </OnBoarding>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;