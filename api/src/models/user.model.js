import bcrypt from 'bcrypt';
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Missing name attribute'] },
    surname: { type: String, required: [true, 'Missing surname attribute'] },
    email: { type: String, required: [true, 'Missing email attribute'], unique: true, lowercase: true, trim: true },
    country: { type: String, required: [true, 'Missing country attribute'] },
    password: { type: String, required: [true, 'Missing password attribute'] },
    cellphone: { type: String, required: [true, 'Missing cellphone attribute'] },
    isVerified: { type: Boolean, default: false }
});


userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model('User', userSchema);