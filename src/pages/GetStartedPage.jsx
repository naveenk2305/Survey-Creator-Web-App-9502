import React from 'react';
import { motion } from 'framer-motion';
import GetStartedComponent from '../components/GetStartedComponent';

const GetStartedPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Get Started with Survey Creator
          </h1>
          <p className="text-lg text-gray-600">
            Follow this interactive guide to learn how to create amazing surveys
          </p>
        </div>
        
        <GetStartedComponent />
      </div>
    </motion.div>
  );
};

export default GetStartedPage;