import dotenv from 'dotenv';
import { ExtractJwt, Strategy} from 'passport-jwt';
import User from '../models/user.model.js';


dotenv.config();

const optStrategy = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

export default new Strategy(optStrategy, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (user) { return done(null, user) }
        return done(null, false);
    } catch (error) {
        done(error, false)
    }
});