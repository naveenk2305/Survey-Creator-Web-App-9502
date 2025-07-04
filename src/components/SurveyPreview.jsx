import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSurvey } from '../context/SurveyContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiCheck, FiArrowRight } = FiIcons;

const SurveyPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSurveyById } = useSurvey();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      const existingSurvey = getSurveyById(id);
      if (existingSurvey) {
        setSurvey(existingSurvey);
      } else {
        navigate('/');
      }
    }
  }, [id, getSurveyById, navigate]);

  const handleResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const renderQuestion = (question) => {
    const response = responses[question.id] || '';

    switch (question.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
        return (
          <input
            type={question.type === 'email' ? 'email' : question.type === 'phone' ? 'tel' : question.type === 'number' ? 'number' : 'text'}
            value={response}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Your answer..."
          />
        );

      case 'textarea':
        return (
          <textarea
            value={response}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            rows="4"
            placeholder="Your answer..."
          />
        );

      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={response === option}
                  onChange={(e) => handleResponse(question.id, e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  value={option}
                  checked={Array.isArray(response) ? response.includes(option) : false}
                  onChange={(e) => {
                    const currentResponses = Array.isArray(response) ? response : [];
                    if (e.target.checked) {
                      handleResponse(question.id, [...currentResponses, option]);
                    } else {
                      handleResponse(question.id, currentResponses.filter(r => r !== option));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'dropdown':
        return (
          <select
            value={response}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select an option...</option>
            {question.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'rating':
        return (
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleResponse(question.id, rating)}
                className={`p-2 rounded-lg transition-colors ${
                  response >= rating
                    ? 'text-yellow-500 bg-yellow-50'
                    : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-50'
                }`}
              >
                <SafeIcon icon={FiStar} className="w-6 h-6" />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {response ? `${response} out of 5` : 'Click to rate'}
            </span>
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            value={response}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        );

      default:
        return null;
    }
  };

  if (!survey) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading survey...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="bg-white rounded-xl shadow-lg p-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your responses have been recorded successfully.
          </p>
          <button
            onClick={() => navigate(`/edit/${survey.id}`)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
          >
            Back to Editor
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {survey.title || 'Untitled Survey'}
          </h1>
          {survey.description && (
            <p className="text-lg text-gray-600">
              {survey.description}
            </p>
          )}
        </div>

        {survey.questions && survey.questions.length > 0 ? (
          <div className="space-y-8">
            {survey.questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 border border-gray-200 rounded-lg"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {index + 1}. {question.question}
                    {question.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </h3>
                </div>
                {renderQuestion(question)}
              </motion.div>
            ))}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: survey.questions.length * 0.1 }}
              className="pt-6"
            >
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg"
              >
                <span>Submit Survey</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              This survey doesn't have any questions yet.
            </p>
            <button
              onClick={() => navigate(`/edit/${survey.id}`)}
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Add Questions
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SurveyPreview;