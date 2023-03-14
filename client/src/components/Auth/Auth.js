import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {Provider, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signin, signup} from '../../actions/auth';
import { configureStore } from "@reduxjs/toolkit"; //  IMPORTANT!!!! DO AN npm install '@reduxjs/toolkit' --legacy-peer-deps
import authReducer from '../../reducers/auth';

const AuthWrapper = () => {
  const store = configureStore({reducer: authReducer});

  return (
    <Provider store={store}> 
      <Auth /> 
    </Provider>
  );
};
//all initial states for fields for Input for form
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
	//FRONTEND css design
	const classes = useStyles();
	//show password when typing or not
	const [showPassword, setShowPassword] = useState(false);
	// toggle between sign up page and login page
	const [isSignup, setIsSignup] = useState(false);
	//user data for when client logs In
	const [formData, setFormData] = useState(initialState);
	//toggle show password or not
	const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword);
	//history
	const history = useHistory();
	//dispatch
	const dispatch = useDispatch();

	//switches to Log In Page vs Sign up Page
	const switchMode =() =>{
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	};
	//how to save data when login
	const handleSubmit = (e) =>{
		e.preventDefault();
		//two cases 1. sign up button action. 2. sign in action
		if(isSignup){
			//delete
			console.log("client auth auth.js call signup before call");
			dispatch(signup(formData, history));
		}
		else{
			dispatch(signin(formData, history));
		}
	};
	const handleChange = (e) =>{
		setFormData({ ...formData, [e.target.name]: e.target.value});
	};

	return(
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
					{
						isSignup && (
							<>
								<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
								<Input name="lastName" label="Last Name" handleChange={handleChange} half />
							</>
					)}
						<Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
						<Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
						{isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
					
					</Grid>
					<Button type="submit" fullWidth variant="constrained" color="primary" className={classes.submit}>
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{ isSignup ? "Already have an account ? Sign In" : "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};
export default AuthWrapper;