import {FETCH_BY_SEARCH, FETCH_ALL, FETCH_POST, START_LOADING, END_LOADING, CREATE, DELETE, UPDATE} from '../constants/actionTypes';
import * as api from '../api';

//Action Creators: return an action 
//Since we are using thunk and have to deal with async logic, we add async dispatch
export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: FETCH_POST, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  
export const getPosts = (page)=> async (dispatch) => {

    try{
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPosts(page);
        //action is an object that has a type and a payload
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING})
    } catch(error){
        console.log(error.message);
    } 
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data});
        console.log(data);
        dispatch({type: END_LOADING})
    } catch(error){
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const { data } = await api.createPost(post); 

        dispatch({type: CREATE, payload: data});
        dispatch({type: END_LOADING})
    } catch(error){
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) =>{
    try{
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch(error){
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) =>{
    try{
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id});
    } catch(error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) =>{
    try{
        const {data} = await api.likePost(id)

        dispatch({type: UPDATE, payload: data});
    } catch(error){
        console.log(error);
    }
}