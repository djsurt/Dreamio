import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';

const Auth = () => {
	//FRONTEND css design
	const classes = useStyles();
	//show password when typing or not
	const [showPassword, setShowPassword] = useState(false);
	// toggle between sign up page and login page
	const [isSignup, setIsSignup] = useState(false);
	//toggle show password or not
	const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword);

	//switches to Log In Page vs Sign up Page
	const switchMode =() =>{
		setIsSignup((prevIsSignup) => !prevIsSignup);
		handleShowPassword(false);
	};
	const handleSubmit = () =>{

	};
	const handleChange = () =>{

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
export default Auth;