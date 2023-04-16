import express from "express";

import { signin, signup} from "../controllers/user.js";
import { getUsers, getUserByUsername, getUserFriends, getUserFriendRequests, sendFriendRequest, acceptFriendRequest, ignoreFriendRequest } from '../controllers/userController.js';

const router = express.Router();

//send data to backend. the form send data to the backend
router.post('/signin', signin); 
router.post('/signup', signup); 
router.get('/', getUsers);
router.get('/:username', getUserByUsername);
router.post('/sendRequest', sendFriendRequest);
router.post('/acceptRequest', acceptFriendRequest);
router.post('/ignoreRequest', ignoreFriendRequest);
router.get('/:userId/friends', getUserFriends);
router.get('/:userId/friendRequests', getUserFriendRequests);
export default router;