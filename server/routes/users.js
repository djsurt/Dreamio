import express from "express";

import { signin, signup} from "../controllers/user.js";
import {getUsers, getUserByUsername} from "../controllers/userController.js";

const router = express.Router();

//send data to backend. the form send data to the backend
router.post('/signin', signin); 
router.post('/signup', signup); 
router.get('/', getUsers);
router.get('/:username', getUserByUsername);
export default router;