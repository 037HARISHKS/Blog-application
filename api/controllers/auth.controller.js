import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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


export const signIn = async (req,res,next) => {
    console.log(req.body);
    const {email , password} = req.body;
    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400,'All fields are required'));
        // return res.status(400).json({ message: "All the fields are required", success: false });
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'User not found'));
            //return res.status(404).json({ message: "user not found", success: false });
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,'Invalid Password'));
        }
        const token = jwt.sign(
            {id: validUser._id},process.env.JWT_SECRET
        );
        res.status(200).cookie('access_token',token,{httpOnly: true}).json(validUser);

    } catch (error) {
        next(error);
    }
};
