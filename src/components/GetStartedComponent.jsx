import React from 'react';
import { GetStarted } from '@questlabs/react-sdk';
import { questConfig } from '../config/questConfig';

const GetStartedComponent = () => {
  // Generate or get user ID from localStorage
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = questConfig.USER_ID;
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  return (
    <GetStarted 
      questId={questConfig.GET_STARTED_QUESTID}
      uniqueUserId={getUserId()}
      accent={questConfig.PRIMARY_COLOR}
      autoHide={false}
    >
      <GetStarted.Header />
      <GetStarted.Progress />
      <GetStarted.Content />
      <GetStarted.Footer />
    </GetStarted>
  );
};

export default GetStartedComponent;