import bcrypt from 'bcryptjs'; //npm install bcryptjs --legacy-peer-deps
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async(req, res) => {
	//get data from front end sign in page
	const {email, password} = req.body;

	try{
		//find the exisitng user data in the DB
		const existingUser = await User.findOne({email});
		//if the existing User DNE then message 404
		if(!existingUser) return res.status(404).json({message: "User doesn't exist!!!'"});
		//check password is correct
		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
		if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials!!!"});
		// once we have correct password. login expiration 1 hour
		const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "7d"});
		res.status(200).json({result:existingUser, token});
	}
	catch(error){
		res.status(500).json({message: "Something went WRONG.!"});
	}
};

export const signup = async(req, res) => {
	//get data from frontend from sign up page
	const {email, password, confirmPassword, firstName, lastName} = req.body;
	
	try{
		//find existing user data in DB
		const existingUser = await User.findOne({email});
		//user already exists!! we do not need to sign up 
		if(existingUser) return res.status(404).json({message: "User already exist!!!'"});
		//check that the confirmPassword and the password match 
		if(password !== confirmPassword) return res.status(400).json({message: "Passwords do not match!!!"});
		//good to go to create user
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
		const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "7d"});
		res.status(200).json({result, token});
	}
	catch(error){
		res.status(500).json({message: "Something went WRONG.!"});
	}
};