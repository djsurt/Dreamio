import React, { useState, useEffect } from 'react';
import { fetchUserByUsername } from '../../api';

const UserProfile = ({ match }) => {
    const { username } = match.params;
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const fetchedUserProfile = await fetchUserByUsername(username);
            setUserProfile(fetchedUserProfile.data);
        };

        fetchUserProfile();
    }, [username]);

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{userProfile.name}'s Profile</h1>
            <p>Email: {userProfile.email}</p>
            {/* Add more user-specific data here */}
        </div>
    );
};

export default UserProfile;
