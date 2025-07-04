import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSurvey } from '../context/SurveyContext';
import QuestionBuilder from './QuestionBuilder';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiEye, FiPlus, FiSettings } = FiIcons;

const SurveyBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSurveyById, updateSurvey, currentSurvey, setCurrentSurvey } = useSurvey();
  
  const [survey, setSurvey] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (id) {
      const existingSurvey = getSurveyById(id);
      if (existingSurvey) {
        setSurvey(existingSurvey);
        setCurrentSurvey(existingSurvey);
      } else {
        navigate('/');
      }
    } else if (currentSurvey) {
      setSurvey(currentSurvey);
    } else {
      navigate('/');
    }
  }, [id, getSurveyById, currentSurvey, setCurrentSurvey, navigate]);

  const handleSave = () => {
    if (survey) {
      updateSurvey(survey.id, survey);
      // Show success message or toast
    }
  };

  const handleTitleChange = (e) => {
    const updatedSurvey = { ...survey, title: e.target.value };
    setSurvey(updatedSurvey);
    updateSurvey(survey.id, updatedSurvey);
  };

  const handleDescriptionChange = (e) => {
    const updatedSurvey = { ...survey, description: e.target.value };
    setSurvey(updatedSurvey);
    updateSurvey(survey.id, updatedSurvey);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      type: 'text',
      question: '',
      required: false,
      options: []
    };
    
    const updatedSurvey = {
      ...survey,
      questions: [...(survey.questions || []), newQuestion]
    };
    setSurvey(updatedSurvey);
    updateSurvey(survey.id, updatedSurvey);
  };

  const updateQuestion = (questionId, updates) => {
    const updatedQuestions = survey.questions.map(q => 
      q.id === questionId ? { ...q, ...updates } : q
    );
    const updatedSurvey = { ...survey, questions: updatedQuestions };
    setSurvey(updatedSurvey);
    updateSurvey(survey.id, updatedSurvey);
  };

  const deleteQuestion = (questionId) => {
    const updatedQuestions = survey.questions.filter(q => q.id !== questionId);
    const updatedSurvey = { ...survey, questions: updatedQuestions };
    setSurvey(updatedSurvey);
    updateSurvey(survey.id, updatedSurvey);
  };

  const duplicateQuestion = (questionId) => {
    const questionToDuplicate = survey.questions.find(q => q.id === questionId);
    if (questionToDuplicate) {
      const duplicatedQuestion = {
        ...questionToDuplicate,
        id: Date.now().toString(),
        question: `${questionToDuplicate.question} (Copy)`
      };
      const questionIndex = survey.questions.findIndex(q => q.id === questionId);
      const updatedQuestions = [
        ...survey.questions.slice(0, questionIndex + 1),
        duplicatedQuestion,
        ...survey.questions.slice(questionIndex + 1)
      ];
      const updatedSurvey = { ...survey, questions: updatedQuestions };
      setSurvey(updatedSurvey);
      updateSurvey(survey.id, updatedSurvey);
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

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <input
              type="text"
              value={survey.title}
              onChange={handleTitleChange}
              placeholder="Survey Title"
              className="text-3xl font-bold text-gray-900 bg-transparent border-none outline-none w-full focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
            />
            <textarea
              value={survey.description}
              onChange={handleDescriptionChange}
              placeholder="Survey description (optional)"
              className="mt-3 text-gray-600 bg-transparent border-none outline-none w-full resize-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
              rows="2"
            />
          </div>
          <div className="flex items-center space-x-3 ml-6">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Survey Settings"
            >
              <SafeIcon icon={FiSettings} className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate(`/preview/${survey.id}`)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <SafeIcon icon={FiEye} className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-gray-50 rounded-lg border"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Survey Status
                </label>
                <select
                  value={survey.status}
                  onChange={(e) => {
                    const updatedSurvey = { ...survey, status: e.target.value };
                    setSurvey(updatedSurvey);
                    updateSurvey(survey.id, updatedSurvey);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-6">
          {survey.questions && survey.questions.length > 0 ? (
            survey.questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <QuestionBuilder
                  question={question}
                  questionNumber={index + 1}
                  onUpdate={(updates) => updateQuestion(question.id, updates)}
                  onDelete={() => deleteQuestion(question.id)}
                  onDuplicate={() => duplicateQuestion(question.id)}
                />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiPlus} className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
              <p className="text-gray-600 mb-6">Start building your survey by adding your first question.</p>
            </div>
          )}

          <motion.button
            onClick={addQuestion}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-gray-600 hover:text-blue-600 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>Add Question</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SurveyBuilder;