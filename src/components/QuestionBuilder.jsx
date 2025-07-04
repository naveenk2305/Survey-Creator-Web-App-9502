import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiType, FiList, FiCheckSquare, FiCircle, FiStar, FiCalendar, FiMail, FiPhone, FiHash, FiMoreVertical, FiTrash2, FiCopy, FiMove, FiPlus, FiX } = FiIcons;

const QuestionBuilder = ({ question, questionNumber, onUpdate, onDelete, onDuplicate }) => {
  const [showMenu, setShowMenu] = useState(false);

  const questionTypes = [
    { type: 'text', label: 'Text', icon: FiType },
    { type: 'textarea', label: 'Long Text', icon: FiType },
    { type: 'multiple-choice', label: 'Multiple Choice', icon: FiCircle },
    { type: 'checkbox', label: 'Checkbox', icon: FiCheckSquare },
    { type: 'dropdown', label: 'Dropdown', icon: FiList },
    { type: 'rating', label: 'Rating', icon: FiStar },
    { type: 'date', label: 'Date', icon: FiCalendar },
    { type: 'email', label: 'Email', icon: FiMail },
    { type: 'phone', label: 'Phone', icon: FiPhone },
    { type: 'number', label: 'Number', icon: FiHash }
  ];

  const handleTypeChange = (newType) => {
    const updates = { type: newType };
    if (['multiple-choice', 'checkbox', 'dropdown'].includes(newType)) {
      updates.options = question.options?.length > 0 ? question.options : ['Option 1', 'Option 2'];
    }
    onUpdate(updates);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...(question.options || [])];
    newOptions[index] = value;
    onUpdate({ options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`];
    onUpdate({ options: newOptions });
  };

  const removeOption = (index) => {
    const newOptions = question.options.filter((_, i) => i !== index);
    onUpdate({ options: newOptions });
  };

  const needsOptions = ['multiple-choice', 'checkbox', 'dropdown'].includes(question.type);

  return (
    <motion.div 
      className="question-card bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="drag-handle flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg text-gray-400 hover:bg-gray-200 transition-colors">
            <SafeIcon icon={FiMove} className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Question {questionNumber}
          </span>
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
                onClick={() => {
                  onDuplicate();
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <SafeIcon icon={FiCopy} className="w-4 h-4" />
                <span>Duplicate</span>
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
              >
                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {questionTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => handleTypeChange(type.type)}
                className={`question-type-btn flex flex-col items-center space-y-1 p-3 rounded-lg border-2 transition-all ${
                  question.type === type.type
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <SafeIcon icon={type.icon} className="w-4 h-4" />
                <span className="text-xs font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Text
          </label>
          <input
            type="text"
            value={question.question}
            onChange={(e) => onUpdate({ question: e.target.value })}
            placeholder="Enter your question..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {needsOptions && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options
            </label>
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="option-input flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {question.options.length > 2 && (
                    <button
                      onClick={() => removeOption(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiX} className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addOption}
                className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <span>Add Option</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={question.required}
              onChange={(e) => onUpdate({ required: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Required</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionBuilder;