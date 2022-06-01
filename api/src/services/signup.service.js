import dotenv from 'dotenv';
import User from '../models/user.model.js';
import nodemailer from 'nodemailer';

dotenv.config();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CREATOR,
        pass: process.env.PASS
    },
    tls: {
        rejectUnanthorized: false

    }
})


const signUpService = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) throw new Error('Email already registered');

        const newUser = new User(req.body);
        await newUser.save();

        var mailOptions = {
            from: ` "Verify your email" <${process.env.CREATOR}>`,
            to: newUser.email,
            subject: 'Verify your email',
            html: `<h2> ${newUser.name}! Thanks for registering on our site </h2>
                    <h4>Please verify your email to continue...</h4>
                    <a href="http://${req.headers.host}/signup/verify-email?id=${newUser.id}">Verify Your Email</a>`
        };

        // sending email
         transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                throw new Error('Verification email could not be sent');
            }
            else {
                console.log('Verification email is send to gmail account')
            }
        });

        return newUser;
    } catch (error) {
        return res.status(400).json({ success: false, message: e.message });
    }
};


export default signUpService;