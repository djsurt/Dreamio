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