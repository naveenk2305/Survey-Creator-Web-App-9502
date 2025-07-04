import React, { createContext, useContext, useState, useEffect } from 'react';

const SurveyContext = createContext();

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};

export const SurveyProvider = ({ children }) => {
  const [surveys, setSurveys] = useState([]);
  const [currentSurvey, setCurrentSurvey] = useState(null);

  useEffect(() => {
    const savedSurveys = localStorage.getItem('surveys');
    if (savedSurveys) {
      setSurveys(JSON.parse(savedSurveys));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('surveys', JSON.stringify(surveys));
  }, [surveys]);

  const createSurvey = () => {
    const newSurvey = {
      id: Date.now().toString(),
      title: 'Untitled Survey',
      description: '',
      questions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft'
    };
    setSurveys(prev => [...prev, newSurvey]);
    setCurrentSurvey(newSurvey);
    return newSurvey;
  };

  const updateSurvey = (surveyId, updates) => {
    setSurveys(prev => prev.map(survey => 
      survey.id === surveyId 
        ? { ...survey, ...updates, updatedAt: new Date().toISOString() }
        : survey
    ));
    
    if (currentSurvey && currentSurvey.id === surveyId) {
      setCurrentSurvey(prev => ({ ...prev, ...updates }));
    }
  };

  const deleteSurvey = (surveyId) => {
    setSurveys(prev => prev.filter(survey => survey.id !== surveyId));
    if (currentSurvey && currentSurvey.id === surveyId) {
      setCurrentSurvey(null);
    }
  };

  const getSurveyById = (surveyId) => {
    return surveys.find(survey => survey.id === surveyId);
  };

  const duplicateSurvey = (surveyId) => {
    const originalSurvey = getSurveyById(surveyId);
    if (originalSurvey) {
      const duplicatedSurvey = {
        ...originalSurvey,
        id: Date.now().toString(),
        title: `${originalSurvey.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft'
      };
      setSurveys(prev => [...prev, duplicatedSurvey]);
      return duplicatedSurvey;
    }
  };

  const value = {
    surveys,
    currentSurvey,
    setCurrentSurvey,
    createSurvey,
    updateSurvey,
    deleteSurvey,
    getSurveyById,
    duplicateSurvey
  };

  return (
    <SurveyContext.Provider value={value}>
      {children}
    </SurveyContext.Provider>
  );
};