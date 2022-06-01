import signUpService  from '../services/signup.service.js';


export const signUpController = async (req, res) => {

    const { email, password, name, surname, country, cellphone } = req.body;

    if (!email || !password || !name || !surname || !country || !cellphone) {
        return res.json({ success: false, message: `Missing info`  });
    }

    try {
        const newUser = await signUpService(req);

        //if (!newUser) throw new Error('Email already registered')
        return res.status(200).json({ success: true });

    } catch (e) {
        return res.json({ success: false, message: e.message });   ///Si pongo status(400) no me tira la alerta
    }
}