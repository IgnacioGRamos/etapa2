import User from '../models/user.model.js';


const verifyEmail = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user?.isVerified) {
            next()
        }
        else {
            throw new Error('Email not verified');
        }
    } catch (error) {
        res.json({success: false, message: error.message})
    }

};


export default verifyEmail