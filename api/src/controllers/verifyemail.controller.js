import { response } from 'express';
import User from '../models/user.model.js';


export const verifyEmail = async (req, res) => {

    try {
        const id = req.query.id;
        const user = await User.findById(id)

        if (user) {
            user.isVerified = true;
            await user.save();
            res.redirect('http://localhost:3000/home')
        } else {
            res.redirect('http://localhost:3000/register');
        }

    } catch (e) {
        res.status(400).json({ success: false, message: e.message })
    }
}