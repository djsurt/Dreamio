import React, { useState, useEffect } from 'react';
import { fetchUserByUsername, getUserFriends, getUserFriendRequests, sendFriendRequest, acceptFriendRequest, ignoreFriendRequest } from '../../api';
import useStyles from './styles';//for front end styles
import {Grid, CircularProgress, Paper, Card, CardHeader, CardContent, Button} from '@material-ui/core';
//import {CloudIcon, SnoozeIcon, NotificationsIcon, FaceRetouchingOffIcon} from '@mui/icons-material';
import SnoozeIcon from '@mui/icons-material/Snooze';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CloudIcon from '@mui/icons-material/Cloud';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import FaceIcon from '@mui/icons-material/Face';
const UserProfile = ({ match }) => {
    const { username } = match.params;
    const classes = useStyles(); //-- line for CSS styles frontend design
    const [userProfile, setUserProfile] = useState(null);
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const loggedInUser = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
      const fetchUserProfile = async () => {
          const fetchedUserProfile = await fetchUserByUsername(username);
          setUserProfile(fetchedUserProfile.data);
      };

      fetchUserProfile();
  }, [username]);

  useEffect(() => {
    const fetchUserFriends = async () => {
        if (userProfile) {
            const fetchedFriends = await getUserFriends(userProfile._id);
            setFriends(fetchedFriends.data);
        }
    };

    fetchUserFriends();
}, [userProfile]);

useEffect(() => {
  const fetchUserFriendRequests = async () => {
      if (userProfile && loggedInUser.result._id === userProfile._id) {
          const fetchedFriendRequests = await getUserFriendRequests(userProfile._id);
          setFriendRequests(fetchedFriendRequests.data);
      }
  };

  fetchUserFriendRequests();
}, [userProfile]);



    const handleSendRequest = async () => {
        await sendFriendRequest(loggedInUser.result._id, userProfile._id);
    };

    const handleAcceptRequest = async (requesterId) => {
      await acceptFriendRequest(loggedInUser.result._id, requesterId);
      setFriendRequests((prevRequests) => prevRequests.filter((request) => request._id !== requesterId));
      const newFriend = await fetchUserByUsername(requesterId);
      setFriends((prevFriends) => [...prevFriends, newFriend.data]);
  };

  const handleIgnoreRequest = async (requesterId) => {
      await ignoreFriendRequest(loggedInUser.result._id, requesterId);
      setFriendRequests((prevRequests) => prevRequests.filter((request) => request._id !== requesterId));
  };

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    const isFriend = loggedInUser.result.friends.includes(userProfile._id);
    const hasSentRequest = userProfile.friendRequests.includes(loggedInUser.result._id);
    var profileText = userProfile.name + "'s Profile";
 
    return (
        <div className={classes.mainContainer}>
            <Grid className={classes.secondaryContainer} container alignItems="stretch" spacing={3}>
                <Grid item xs={2}></Grid>
                <Grid className={classes.center} item xs={8}>
                    <Card className={classes.cardContainer}>
                        <CardHeader title={profileText} subheader={userProfile.email}/>
                        <h1 className={classes.center}>
                            <CloudIcon fontSize="large"/>&nbsp;&nbsp;
                            <CloudIcon fontSize="large" color="primary"/>&nbsp;&nbsp;
                            <CloudIcon fontSize="large"/>&nbsp;&nbsp;
                            <CloudIcon fontSize="large" color="primary"/>&nbsp;&nbsp;
                            <CloudIcon fontSize="large"/>
                        </h1>
                         <hr className={classes.line}/>
                        <CardContent className={classes.cardContainer}>
                           
                      
                            {/* <h1>{userProfile.name}'s Profile</h1>
                            <p>Email: {userProfile.email}</p>*/}
                  
                            {loggedInUser.result._id !== userProfile._id && (
                                isFriend ? (
                                    <Paper className={classes.paperLength} elevation={4}>
                                        <p>You are friends.</p>
                                    </Paper>
                                ) : hasSentRequest ? (
                            <div>
                                <h3>Waiting for response...</h3>
                                <Button variant="contained" color="secondary" onClick={handleAcceptRequest} startIcon={<AddReactionIcon />}>Accept Friend Request</Button>&nbsp;&nbsp;
                                <Button variant="contained" color="secondary" onClick={handleIgnoreRequest} startIcon ={<SnoozeIcon />}>Ignore Friend Request</Button>
                                
                            </div>
                            ) : (
                                <Button variant="contained" color="secondary" onClick={handleSendRequest}>Send Friend Request</Button>
                            )
                            )}

                    {loggedInUser.result._id === userProfile._id && (
                        <div className={classes.cardContainer}>
                            <Grid container spacing={3} className ={classes.gridInner}>
                                <Grid item xs={6} className={classes.cardContainer}>
                                    <Paper elevation={4} className={classes.paperColor}>
                                    {/* ... friends list */}
                                        <h3><FaceIcon /> Friends:</h3>
                                       
                                        {friends.length === 0 ? (
                                           
                                        <p>  <FaceRetouchingOffIcon fontSize="large"/> You have no friends.</p>
                                        ) : (
                                        <ul>
                                            {friends.map((friend) => (
                                            <li key={friend._id}>{friend.name}</li>
                                            ))}
                                        </ul>
                                        )}
                                    </Paper>
                                </Grid>
                                <Grid item xs={5} className ={classes.cardContainer}>
                                    <Paper elevation={4} className={classes.paperColor}>
                                        <h3><NotificationsIcon color="primary"/> Friend Requests</h3>
                                    {(
                                        <ul>
                                        {friendRequests.map((request) => (
                                        <li key={request._id}>
                                            {request.name}
                                            <Button variant="contained" color="primary" onClick={() => handleAcceptRequest(request._id)} startIcon={<AddReactionIcon />}>Accept</Button>&nbsp;&nbsp;
                                            <Button variant="contained" color="secondary" onClick={() => handleIgnoreRequest(request._id)} startIcon={<SnoozeIcon />}>Ignore</Button>
                                        </li>
                                        ))}
                                        </ul>
                                    )}
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                    </CardContent>
                    </Card>
                </Grid>
        <Grid item xs={2}></Grid>
            {/* Add more user-specific data here */}       
    </Grid>
    </div>
    );
};

export default UserProfile;
