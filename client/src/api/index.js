import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4005' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token }`;
    }

    return req;
});

export const fetchPost = (id)=> API.get(`/posts/${id}`);

export const fetchPosts = (page)=> API.get(`/posts?page=${page}`);

export const fetchPostsBySearch  = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const fetchUsers = () => API.get('/user');
export const fetchUserByUsername = (username) => API.get(`/user/${username}`);
export const sendFriendRequest = (senderId, receiverId) => API.post('/user/sendRequest', { senderId, receiverId });
export const acceptFriendRequest = (userId, requesterId) => API.post(`/user/acceptRequest/${userId}/${requesterId}`);
export const ignoreFriendRequest = (userId, requesterId) => API.post(`/user/ignoreRequest/${userId}/${requesterId}`);
export const getUserFriends = (userId) => API.get(`/user/${userId}/friends`);
export const getUserFriendRequests = (userId) => API.get(`/user/${userId}/friendRequests`);
// api/index.js
export const fetchUserById = (id) => API.get(`/user/id/${id}`);

