import React from 'react';
import './FeddbackMessage.css'

const FeedbackMessage = ({ type, message }) => {
  if (!message) return null;

  return (
    <div className={`feedback-message ${type}`}>
      {message}
    </div>
  );
};

export default FeedbackMessage;
