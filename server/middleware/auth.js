import jwt from 'jsonwebtoken'; //npm install jsonwebtoken --legacy-peer-deps

const auth = async(req, res, next) =>{
	try{
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500; //dont need line lgreater than 500 means google authentication
		let decodedData;
		if(token && isCustomAuth){
			decodedData = jwt.verify(token, 'test');
			req.userId = decodedData?.id;

		}
		//don't need because this part is google
		//else{
			//decodedData = jwt.decode(token);
			//req.userId = decodedData?.sub;
		//}
		next();
		

	}
	catch(error){
		console.log(error);
	}
};

export default auth;