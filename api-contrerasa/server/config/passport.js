import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt-nodejs';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

import knex from './../config/knex';
import config from './../config/main';

//use username rather than email
const localOptions = {usernameField: 'email'};

const localLogin = new LocalStrategy(localOptions,
	async function(email,password,done){
		//Check to see if user exists
		const user = await knex('users')
			.where({email}).first();
		//Compare email
		if(!user)
			return done(null,false,{error:'Incorrect Email'});
		//Compare Pass
		bcrypt.compare(password, user.password, (err, isMatch)=>{
			if(!isMatch)
				return done(null,false, {error:'Incorrect Password'});
			return done(null, user);
		})
	}
);

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, async (payload,done)=>{
	const user = await knex('users')
		.where({id:payload.id}).first();
		if(user)
			return done(null,user);
		else
			return done(null,false);
})

passport.use(localLogin)
passport.use(jwtLogin)