import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import nodemailer from 'nodemailer';

dotenv.config();




export const getUserService = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (e) {
        return res.status(400).json({ success: false, message: e.message });
    }
};

export const matchUserPasswordService = async (user, password) => {
    try {
        const match = await user.comparePassword(password);
        return match;
    } catch (e) {
        return res.status(400).json({ success: false, message: e.message });
    }
};

export const createUserTokenService = (user) => {
    return jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
};

export const sendResetPasswordEmailService = async (user, req) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CREATOR,
            pass: process.env.PASS
        },
        tls: {
            rejectUnanthorized: false
        }
    });

    const mailOptions = {
        from: process.env.CREATOR,
        to: user.email,
        subject: 'Reset Password',
        html: `<p>${user.name}, your password has been changed successfully. You must verify your account again.</p>
               <a href="http://${req.headers.host}/signup/verify-email?id=${user.id}">Verify Your Email</a>`
    }
    
    try {
        await transporter.sendMail(mailOptions);
        return 
    } catch (e) {
        return res.status(400).json({ success: false, message: e.message });
    }
}