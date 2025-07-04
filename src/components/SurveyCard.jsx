import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSurvey } from '../context/SurveyContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit3, FiEye, FiCopy, FiTrash2, FiMoreVertical, FiCalendar, FiUsers } = FiIcons;

const SurveyCard = ({ survey }) => {
  const { deleteSurvey, duplicateSurvey } = useSurvey();
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this survey?')) {
      deleteSurvey(survey.id);
    }
  };

  const handleDuplicate = (e) => {
    e.preventDefault();
    duplicateSurvey(survey.id);
    setShowMenu(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div 
      className="survey-card bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      whileHover={{ y: -4 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {survey.title || 'Untitled Survey'}
            </h3>
            {survey.description && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {survey.description}
              </p>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={handleDuplicate}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <SafeIcon icon={FiCopy} className="w-4 h-4" />
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiCalendar} className="w-4 h-4" />
              <span>{formatDate(survey.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiUsers} className="w-4 h-4" />
              <span>{survey.questions?.length || 0} questions</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(survey.status)}`}>
            {survey.status}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to={`/edit/${survey.id}`}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
          >
            <SafeIcon icon={FiEdit3} className="w-4 h-4" />
            <span>Edit</span>
          </Link>
          <Link
            to={`/preview/${survey.id}`}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <SafeIcon icon={FiEye} className="w-4 h-4" />
            <span>Preview</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SurveyCard;