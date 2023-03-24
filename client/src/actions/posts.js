import { FETCH_ALL, CREATE, DELETE, UPDATE} from '../constants/actionTypes';
import * as api from '../api';

//Action Creators: return an action 
//Since we are using thunk and have to deal with async logic, we add async dispatch
export const getPosts = ()=> async (dispatch) => {

    try{
        const {data} = await api.fetchPosts();
        //action is an object that has a type and a payload
        dispatch({type: FETCH_ALL, payload: data});
    } catch(error){
        console.log(error.message);
    } 
}

export const createPost = (post) => async (dispatch) => {
    try{
        const { data } = await api.createPost(post); 

        dispatch({type: CREATE, payload: data});
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