import {AUTH, LOGOUT} from '../constants/actionTypes';

const authReducer = (state = {authData: null}, action) => {

	switch(action.type){
		case AUTH:
			//save in local storage so won't forget user'
			localStorage.setItem('profile', JSON.stringify({...action?.data}));
			return {...state, authData: action?.data};
		//logout clear local storage
		case LOGOUT:
			localStorage.clear();
			return {...state, authData: null};
		default:
			return state;
	}

};

export default authReducer;
