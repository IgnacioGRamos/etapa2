import { Router } from "express";
import { signUpController } from "../controllers/signup.controller.js";
import { verifyEmail } from '../controllers/verifyemail.controller.js';


const router = Router();

router.post('/', signUpController);
router.get('/verify-email', verifyEmail);

export default router;