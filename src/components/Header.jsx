import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClipboard, FiArrowLeft, FiEye, FiUser, FiChevronDown, FiLogOut } = FiIcons;

const Header = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const isHome = location.pathname === '/';
  const isPreview = location.pathname.includes('/preview');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg border-b border-gray-200"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!isHome && (
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </Link>
            )}
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <SafeIcon icon={FiClipboard} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Survey Creator
                </h1>
                <p className="text-sm text-gray-500">Build beautiful surveys with ease</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isPreview && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">
                <SafeIcon icon={FiEye} className="w-4 h-4" />
                <span className="text-sm font-medium">Preview Mode</span>
              </div>
            )}

            {!isHome && !isPreview && (
              <Link
                to="/"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                My Surveys
              </Link>
            )}

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <SafeIcon icon={FiUser} className="w-4 h-4" />
                <SafeIcon icon={FiChevronDown} className="w-4 h-4" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-2">
                    <Link
                      to="/get-started"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span>Get Started Guide</span>
                    </Link>
                    <Link
                      to="/onboarding"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span>Onboarding</span>
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;