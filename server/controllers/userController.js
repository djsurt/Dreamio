import mongoose from 'mongoose';
import User from '../models/user.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ name: username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const sendFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!receiver.friendRequests.includes(senderId)) {
            receiver.friendRequests.push(senderId);
            await receiver.save();
        }

        res.status(200).json({ message: 'Friend request sent.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const acceptFriendRequest = async (req, res) => {
    const { userId, requesterId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(requesterId)) {
        return res.status(404).send('No user with that id');
    }

    const user = await User.findById(userId);
    const requester = await User.findById(requesterId);

    user.friendRequests.pull(requesterId);
    requester.friends.push(userId);
    user.friends.push(requesterId);

    await user.save();
    await requester.save();

    res.status(200).json({ message: 'Friend request accepted.' });
};

export const ignoreFriendRequest = async (req, res) => {
    const { userId, requesterId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(requesterId)) {
        return res.status(404).send('No user with that id');
    }

    const user = await User.findById(userId);

    user.friendRequests.pull(requesterId);

    await user.save();

    res.status(200).json({ message: 'Friend request ignored.' });
};

// ... other imports and functions

export const getUserFriends = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('friends');
        res.status(200).json(user.friends);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// ... other imports and functions

export const getUserFriendRequests = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('friendRequests');
        res.status(200).json(user.friendRequests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// userController.js
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




