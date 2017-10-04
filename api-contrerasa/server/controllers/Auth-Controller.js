import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';

import knex from './../config/knex';
import config from './../config/main';

//========== Generate Web Token ==========
function generateToken(user){
	return jwt.sign(user,config.secret, {expiresIn:86400});	//expires in 24 hrs
}

//========== Information to encase token ==========
function setUserInfo(request){
	return{
		id: request.id,
		first_name: request.first_name,
		last_name: request.last_name,
		email: request.email,
		// role: request.role,
		// web_token: request.web_token,
		// web_token_expires: request.web_token_expires
	};
}

//========== New ==========
const authController = {};

authController.login = (req,res,next)=>{
	let userInfo = setUserInfo(req.user);
	res.json({
		// token: 'JTW ' + generateToken(userInfo),
		token: generateToken(userInfo),
		user: userInfo
	});
};

authController.register = async(req,res,next)=>{
	let userData = {
		first_name:req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password
	};

	//Check reg for errors
	if(!userData.email)
		return res.status(422).json({error: 'Must include an email address'});
	if(!userData.first_name || !userData.last_name)
		return res.status(422).json({error:'Must include full name'});
	if(!userData.password)
		return res.status(422).json({error:'Must include password'});

	//If user email is already registered
	const user = await knex('users').where('email', userData.email).first();
	if(user)
		return res.status(422).json({error: 'Email is already in use'});

	//If Unique
	//Salt Password
	const SALT_FACTOR = 5;
	bcrypt.genSalt(SALT_FACTOR, (err,salt) =>{
		bcrypt.hash(userData.password,salt,null,(err,hash)=>{
			userData.password = hash;
		});
	});

	const newUser = await knex('users')
	.insert(userData)
	.returning(['id','first_name','last_name','email','role','password']); 

	let userInfo = setUserInfo(newUser[0]);
	res.json({
		token: 'JWT ' + generateToken(userInfo),
		user:userInfo
	});
};

//========== Auth Middleware ==========
authController.roleAuth = role =>{
	return async (req,res,next) =>{
		const user = req.user;
		const foundUser = await knex('users').where({id:user.id}).first();

		//If user is found, check for role
		if(foundUser.role <= role) return next();
		else{
			res.status(401).json({error:'You are not authorized to view this content'});
			return next('Unauthorized')
		}
	};
};

// authController.requireAuth = passport.authenticate('jwt',{session: false});
// authController.requireLogin = passport.authenticate('local',{session:false});

export default authController;