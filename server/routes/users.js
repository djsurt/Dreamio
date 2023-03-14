import express from "express";

import { signin, signup} from "../controllers/user.js";

const router = express.Router();

//send data to backend. the form send data to the backend
router.post('/signin', signin); 
router.post('/signup', signup); 

export default router;