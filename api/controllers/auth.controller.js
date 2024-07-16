import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res, next) => {
    console.log(req.body);  // Debugging line
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: "All the fields are required", success: false });
    }

    const hashpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashpassword,
    });

    try {
        await newUser.save();
        res.json({ message: "Sign-up successful!!", success: true });
    } catch (error) {
        next(error);
    }
};
