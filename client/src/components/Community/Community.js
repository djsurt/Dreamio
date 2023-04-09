import React from 'react';
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
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mongoSentiment = () =>{
  var value = 0;
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
  
    res.on('end', () => {
      let resultingVal = 0;
      const posts = JSON.parse(data);
      for(let i = 0; i < posts.length; ++i){
        resultingVal = resultingVal + (analyzeSentiment(posts[i]['message']));
      }
      value = resultingVal;
    });
  });
  req.on('error', (error) => {
    console.error(error);
  });
  
  req.end();

  if(value <= -1){
    console.log("The community is feeling down at the monment :(");
  } else if(value >= 1){
    console.log("The community is happy!!");
  } else{
    console.log("The community is okay👍");
  }

}

function Community() {
  return <div>{mongoSentiment()}</div>;
}

export default Community;