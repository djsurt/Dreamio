import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import bed from './bed-solid.svg';
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
		<Container component="main" maxWidth="md">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid className={classes.bubble} container spacing={2}>
					{
						isSignup && (
							<>
								<Input className ={classes.makeWhite} name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
								<Input name="lastName" className ={classes.makeWhite} label="Last Name" handleChange={handleChange} half />
							</>
					)}
						<Input name="email" style={{color:'white'}} label="Email Address" handleChange={handleChange} type="email"/>
						<Input name="password" className='classes.makeWhite' label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
						{isSignup && <Input name="confirmPassword" className='classes.makeWhite' label="Repeat Password" handleChange={handleChange} type="password"/>}
					
					</Grid>
					<Button type="submit" variant="constrained" className={classes.submit}>
								{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>
					{/*<Grid className={classes.moveLeft} container>
						
					<Grid item>*/}
							
					<Button className={classes.signup} onClick={switchMode}>
						{ isSignup ? "Sign In" : "Sign Up"}
					</Button>
						{/*</Grid>
					</Grid>*/}
					
				</form>
				<img className={classes.imageBed} src={bed} alt="A Bed" width="200" height="200"/>
			</Paper>
		</Container>
	);
};
export default AuthWrapper;