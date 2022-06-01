import { createUserTokenService, getUserService, matchUserPasswordService, sendResetPasswordEmailService } from '../services/signin.service.js';


export const signInController = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ success: false, message: `Missing info`  });

    try {
        const user = await getUserService(email);
        if (!user) throw new Error(`User doesn't exist`);    //return res.status(400).json({ success: false, message: `User doesn't exist`  });

        const match = await matchUserPasswordService(user, password);
        if (!match) throw new Error('Invalid password'); //return res.status(400).json({ success: false, message: `Invalid password`  });

        const token = createUserTokenService(user);
        if (!token) throw new Error(`Couldn't create token`); //return res.status(400).json({ success: false, message: `Couldn't create token`  });

        return res.status(200).json({ success: 'success', message: token });
    } catch (e) {
        return res.json({ success: false, message: e.message || e  });
    }
};


export const forgotPasswordController = async (req, res) => {
    try {
        const user = await getUserService(req.body.email);
        if (!user) throw new Error("User doesn't exist");
        if(req.body.cellphone === '') throw new Error("You have to send the new Password");
        if(user.cellphone !== req.body.cellphone) throw new Error("The security data does not match");

        await sendResetPasswordEmailService(user, req);

        user.password = req.body.password;
        user.isVerified = false;
        await user.save();

        return res.status(200).json({ success: true, message: `Password has been changed` });
    } catch (e) {
        console.log(e.message)
        return res.json({ success: false, message: e.message || e } );
    }
}