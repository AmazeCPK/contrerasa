import jwt from 'jsonwebtoken';

import knex from './../config/knex';
import bcrypt from 'bcrypt-nodejs';
import config from './../config/main';

import User from './../models/User-Model';

const authController = {}

authController.login = async (req,res,next)=>{
	let userInfo = {
		id: req.user.id,
		first_name: req.user.first_name,
		last_name: req.user.last_name,
		email: req.user.email,
		role: req.user.role
	}
	userInfo.token = 'JWT ' + generateToken(userInfo)

	const updatedUser = await knex('users')
		.where('id',req.user.id)
		.update('token',userInfo.token)

	res.status(200).json({
		token: userInfo.token,
		success:true,
	});
}

authController.register = async (req,res,next)=>{
	const userData = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
	}

	//Validation
	if(!userData.email)
		return res.status(422).json({error:'Please enter a valid email address'});
	if(!userData.first_name || !userData.last_name)
		return res.status(422).json({error:'Please enter full name'});
	if(!userData.password)
		return res.status(422).json({error:'Please enter a password'});
	const existingUser = await knex('users').where('email',userData.email).first();
	if(existingUser)
		return res.status(422).json({error:'Email is already in use'});
	
	const SALT_FACTOR = 5;
	bcrypt.genSalt(SALT_FACTOR, (err,salt)=>{
		bcrypt.hash(userData.password,salt,null,async (err,hash)=>{
			userData.password = hash;
			const newUser = await knex('users')
				.insert(userData)
				.returning('*');
			res.json({success:true});
		});
	});
}

function generateToken(user,expiresIn = 86400){
	return jwt.sign(user,config.secret, {expiresIn:86400});		//set to expire in 24 hrs (86400s)
}

export default authController;