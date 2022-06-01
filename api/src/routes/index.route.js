import express, { Router } from 'express';
import morgan from 'morgan';
import signup from './signup.route.js';
import signin from './signin.route.js';

const router = Router();

//router.use(morgan('dev'));
//router.use(express.urlencoded({ extended: false }));

router.use('/signup', signup);
router.use('/signin', signin);

export default router;