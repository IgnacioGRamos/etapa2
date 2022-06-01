import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import connectToDB from "./db.js";
import passportMiddleware from './middlewares/passport.js';
import routes from './routes/index.route.js';

connectToDB();

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(passport.initialize());
passport.use(passportMiddleware);

app.use('/', routes);

export default app;