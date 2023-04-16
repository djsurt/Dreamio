import React, { useState, useEffect } from 'react';
import { fetchUserByUsername, getUserFriends, getUserFriendRequests, sendFriendRequest, acceptFriendRequest, ignoreFriendRequest } from '../../api';

const UserProfile = ({ match }) => {
    const { username } = match.params;
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

    return (
        <div>
            <h1>{userProfile.name}'s Profile</h1>
            <p>Email: {userProfile.email}</p>
            {/* Add more user-specific data here */}

            {loggedInUser.result._id !== userProfile._id && (
                isFriend ? (
                    <p>You are friends.</p>
                ) : hasSentRequest ? (
                    <div>
                        <button onClick={handleAcceptRequest}>Accept Friend Request</button>
                        <button onClick={handleIgnoreRequest}>Ignore Friend Request</button>
                    </div>
                ) : (
                    <button onClick={handleSendRequest}>Send Friend Request</button>
                )
            )}

            {loggedInUser.result._id === userProfile._id && (
                <div>
                    {/* ... friends list */}
                    
                    {friends.length === 0 ? (
                        <p>You have no friends.</p>
                    ) : (
                        <ul>
                            {friends.map((friend) => (
                                <li key={friend._id}>{friend.name}</li>
                            ))}
                        </ul>
                    )}

                    <h2>Friend Requests</h2>
                      {(
                        <ul>
                            {friendRequests.map((request) => (
                                <li key={request._id}>
                                    {request.name}
                                    <button onClick={() => handleAcceptRequest(request._id)}>Accept</button>
                                    <button onClick={() => handleIgnoreRequest(request._id)}>Ignore</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
