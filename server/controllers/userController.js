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
    const { senderId, receiverId } = req.body;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!receiver.friends.includes(senderId)) {
            receiver.friends.push(senderId);
            receiver.friendRequests.pull(senderId);
            await receiver.save();
        }

        if (!sender.friends.includes(receiverId)) {
            sender.friends.push(receiverId);
            await sender.save();
        }

        res.status(200).json({ message: 'Friend request accepted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const ignoreFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const receiver = await User.findById(receiverId);

        if (receiver.friendRequests.includes(senderId)) {
            receiver.friendRequests.pull(senderId);
            await receiver.save();
        }

        res.status(200).json({ message: 'Friend request ignored.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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



