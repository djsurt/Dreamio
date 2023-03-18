import * as api from '../api';

//Action Creators: return an action 
//Since we are using thunk and have to deal with async logic, we add async dispatch
export const getPosts = ()=> async (dispatch) => {

    try{
        const {data} = await api.fetchPosts();
        //action is an object that has a type and a payload
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch(error){
        console.log(error.message);
    } 
}

export const createPost = (post) => async (dispatch) => {
    try{
        const { data } = await api.createPost(post); 

        dispatch({type: 'CREATE', payload: data});
    } catch(error){
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) =>{
    try{
        const { data } = await api.updatePost(id, post);
        dispatch({ type:'UPDATE', payload: data });
    } catch(error){
        console.log(error.message);
    }
}