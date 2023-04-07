import React from 'react';
import Sentiment from 'sentiment';

const analyzeSentiment = (text) => {
  
  const sentiment = new Sentiment();
  const { score } = sentiment.analyze(text);
  const normalizedScore = score;
  return normalizedScore;
}

function Community() {
  return <div>{analyzeSentiment("this is awesome")}</div>;
}

export default Community;