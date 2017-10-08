import express from 'express';
import passport from 'passport';

import passportService from './../config/passport';
import authController from './../controllers/Auth-Controller';

const router = express.Router();
const requireAuth = passport.authenticate('jwt',{session:false});
const requireLogin = passport.authenticate('local', {session:false});

router.get('/', requireAuth, (req,res)=>{
	res.json({success:true})
});

router.post('/', requireLogin, authController.login);
router.post('/register', authController.register);


export default router;