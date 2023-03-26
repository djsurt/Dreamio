import {AUTH} from '../constants/actionTypes';
import * as api from '../api/index.js';

//used for sign in button action
export const signin = (formData, history) => async(dispatch) =>{
	try{
		//log in the user
		const {data} = await api.signIn(formData);
		dispatch({type: AUTH, data});
		history.push('/');
	}
	catch(error){
		console.log(error);
	}
};

//used for sign up button action
export const signup = (formData, history) => async(dispatch) =>{
	console.log('made it to function');
	try{
		//sign up the user
		
		const {data} = await api.signUp(formData);
		console.log("first line pass");
		dispatch({type: AUTH, data});
		console.log("second lne pass");
		history.push('/');
		console.log("third line pass");
	}
	catch(error){
		console.log(error);
	}
};