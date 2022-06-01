import { Router } from "express";
import passport from 'passport';
import { forgotPasswordController, signInController } from "../controllers/signin.controller.js";
import verifyEmail from '../middlewares/verification.js';
import { verificationController } from '../controllers/verification.controller.js';


const router = Router();

router.post('/', verifyEmail, signInController);

router.post('/verification', passport.authenticate('jwt', { session: false }), verificationController)

// Forgot password

//router.put('/forgot-password', forgotPasswordController);


export default router;