import React, { useEffect, useState } from 'react';
import Sentiment from 'sentiment';
import http from 'http';

const options = {
  hostname: 'localhost',
  port: 4005,
  path: '/posts',
  method: 'GET'
};

const analyzeSentiment = (text) => {
  
  const sentiment = new Sentiment();
  const { score } = sentiment.analyze(text);
  const normalizedScore = score;
  return normalizedScore;
}

const mongoSentiment = async () => {
  let value = 0;
  const fetchPosts = async () => {
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
      
        res.on('end', () => {
          resolve(data);
        });
      });
      req.on('error', (error) => {
        reject(error);
      });
      
      req.end();
    });
  };

  try {
    const data = await fetchPosts();
    let resultingVal = 0;
    const posts = JSON.parse(data);
    for (let i = 0; i < posts.length; ++i) {
      resultingVal = resultingVal + (analyzeSentiment(posts[i]['message']));
    }
    value = resultingVal;
    console.log(value);

    if (value <= -1) {
      return "The community is feeling down at the moment :(";
    } else if (value >= 1) {
      return "The community is happy!!";
    } else {
      return "The community is okay👍";
    }
  } catch (error) {
    console.error(error);
  }
};

function Community() {
  const [sentimentStatus, setSentimentStatus] = useState("");

  useEffect(() => {
    async function fetchSentimentStatus() {
      const status = await mongoSentiment();
      setSentimentStatus(status);
    }
    fetchSentimentStatus();
  }, []);

  return <div>{sentimentStatus}</div>;
}

export default Community;
