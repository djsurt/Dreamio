import axios from 'axios';

const url = 'http://localhost:4004/posts';

export const fetchPosts = ()=> axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);