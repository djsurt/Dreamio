// src/components/UserProfile/UserProfile.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';

import { getUserPosts } from '../../actions/posts';

const UserProfile = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { name } = useParams();

  useEffect(() => {
    dispatch(getUserPosts(name));
  }, [name]);

  return (
    <div>
      <Paper>
        <Typography variant="h4" component="h1">
          {name}'s Posts
        </Typography>
      </Paper>
    </div>
  );
};

export default UserProfile;
