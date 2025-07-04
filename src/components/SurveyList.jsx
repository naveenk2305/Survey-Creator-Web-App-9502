import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSurvey } from '../context/SurveyContext';
import SurveyCard from './SurveyCard';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiClipboard } = FiIcons;

const SurveyList = () => {
  const { surveys, createSurvey } = useSurvey();

  const handleCreateSurvey = () => {
    const newSurvey = createSurvey();
    return newSurvey;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Your Surveys
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create, manage, and analyze your surveys all in one place. 
          Build engaging forms that get the responses you need.
        </p>
      </motion.div>

      {surveys.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <div className="p-6 bg-white rounded-2xl shadow-lg mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <SafeIcon icon={FiClipboard} className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No surveys yet
              </h3>
              <p className="text-gray-600 mb-8">
                Get started by creating your first survey. It's quick and easy!
              </p>
              <Link
                to="/create"
                onClick={handleCreateSurvey}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Create Your First Survey</span>
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {surveys.length} Survey{surveys.length !== 1 ? 's' : ''}
              </h3>
              <p className="text-gray-600">
                Manage your surveys and track their performance
              </p>
            </div>
            <Link
              to="/create"
              onClick={handleCreateSurvey}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5" />
              <span>New Survey</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveys.map((survey, index) => (
              <motion.div
                key={survey.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SurveyCard survey={survey} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SurveyList;