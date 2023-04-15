import express from "express";

import { getPostsBySearch, getPost, getPosts, createPost, updatePost, deletePost, likePost, commentPost, getPostsByCreator } from "../controllers/posts.js";
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/creator/:name', getPostsByCreator);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
//router.post('/', auth, createPost)
router.post('/:id/commentPost', auth, commentPost);

export default router;