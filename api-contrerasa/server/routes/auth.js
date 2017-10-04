import express from 'express';
import AuthController from './../controllers/Auth-Controller';
import passportService from './../config/passport';
import passport from 'passport';

// Todo- move to controller
const requireAuth = passport.authenticate('jwt',{session:false});
const requireLogin = passport.authenticate('local',{session:false});

const router = express.Router();

// Check Auth
router.get('/', requireAuth, (req,res)=>{
	res.json({success:true});
})

// Register
router.post('/register', AuthController.register);

// Login 
router.post('/login', requireLogin, AuthController.login);

export default router;