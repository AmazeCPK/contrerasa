import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt-nodejs';

import knex from './../config/knex';
import config from './../config/main';


const localOptions = {usernameField: 'email'};	//Use email rather than username


//========== (LOCAL LOGIN STRAT) ==========
const localLogin = new LocalStrategy(localOptions, async (email,password,done)=>{
	const user = await knex('users').where({email}).first();
	if(!user) return done(null,false,{error: 'Incorrect Email'});

	//Compare Password
	bcrypt.compare(password, user.password, (err,isMatch)=>{
		if(!isMatch) return done(null, false, {error: 'Incorrect Password'});
		return done(null,user);
	});
});

//========== JWT LOCAL STRATEGY ==========
const jwtOptions = {
	jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload,done)=>{
	console.log('test')
	const user = await knex('users').where({id:payload.id}).first();
	if(user)
		done(null, user);
	else
		done(null,false);
});

async function comparePassword(candidatePassword, cb){
	bcrypt.compare(candidatePassword, this.password, function(err,isMatch){
		if(err)
			return cb(err);
		cb(null, isMatch);
	});
}

passport.use(jwtLogin);
passport.use(localLogin);
