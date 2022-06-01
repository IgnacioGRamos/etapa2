import signUpService  from '../services/signup.service.js';


export const verificationController = async (req, res) => {

    const user = req.user;

    if (!user) {
        return res.json({ success: false, message: `Unauthorized`  });
    }

    return res.status(200).json({ success: true, message: user });

}