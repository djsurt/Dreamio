// src/components/UserProfile/UserProfile.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const { userId } = useParams();

  // Fetch user data here using the userId and store it in the component state.

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h4">
          User Profile
        </Typography>
        {/* Render user data here */}
      </Paper>
    </div>
  );
};

export default UserProfile;
