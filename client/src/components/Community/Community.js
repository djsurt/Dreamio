import React, { useEffect, useState } from 'react';
import Sentiment from 'sentiment';
import http from 'http';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

const options = {
  hostname: 'localhost',
  port: 4005,
  path: '/posts',
  method: 'GET'
};

const happyImage = 'https://p1.hiclipart.com/preview/841/78/529/emoji-sticker-smiling-emoji-png-clipart.jpg';
const neutralImage = 'https://www.vhv.rs/dpng/d/533-5334374_slightly-smiling-face-icon-emoji-hd-png.png';
const sadImage = 'https://www.pngfind.com/pngs/m/47-476199_free-png-download-sad-emoji-png-images-background.png';

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
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSentimentStatus() {
      const status = await mongoSentiment();
      setSentimentStatus(status);
      if (status === "The community is feeling down at the moment :(") {
        setImageURL(sadImage);
      } else if (status === "The community is happy!!") {
        setImageURL(happyImage);
      } else {
        setImageURL(neutralImage);
      }
      setLoading(false);
    }
    fetchSentimentStatus();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar alt="Sentiment Image" src={imageURL} sx={{ width: 100, height: 100 }} />
            </Box>
            <Typography variant="h5" component="div" align="center">
              Community Sentiment
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {sentimentStatus}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default Community;