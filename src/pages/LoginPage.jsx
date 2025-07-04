import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../context/AuthContext';
import { questConfig } from '../config/questConfig';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClipboard, FiTrendingUp, FiUsers, FiBarChart3 } = FiIcons;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = ({ userId, token, newUser }) => {
    login({ userId, token });
    
    if (newUser) {
      navigate('/onboarding');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Section - Branding */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <SafeIcon icon={FiClipboard} className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Survey Creator</h1>
                    <p className="text-blue-100">Build beautiful surveys with ease</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    Welcome Back to Your
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                      Survey Dashboard
                    </span>
                  </h2>
                  
                  <p className="text-xl text-blue-100 leading-relaxed">
                    Create engaging surveys, collect valuable insights, and make data-driven decisions with our powerful survey builder.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-yellow-300" />
                      <div>
                        <h3 className="font-semibold">Analytics</h3>
                        <p className="text-sm text-blue-100">Real-time insights</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <SafeIcon icon={FiUsers} className="w-6 h-6 text-green-300" />
                      <div>
                        <h3 className="font-semibold">Collaboration</h3>
                        <p className="text-sm text-blue-100">Team workspace</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Section - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center"
            >
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Sign In
                  </h2>
                  <p className="text-gray-600">
                    Access your survey dashboard and continue building amazing forms
                  </p>
                </div>

                <div className="quest-login-container">
                  <QuestLogin
                    onSubmit={handleLogin}
                    email={true}
                    google={false}
                    accent={questConfig.PRIMARY_COLOR}
                  />
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;