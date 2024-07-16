import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';

export const signUp = async (req,res,next) =>{
    const {username ,email ,password} = req.body;

    if(!username || !email || !password || username === '' || email ==='' || password ===''  ){
        return res.status(400).json({message : "All the feilds are required "})
    }

    const hashpassword = bcryptjs.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password : hashpassword,
    });

    try{
        await newUser.save();
        res.json({message :"sign-up successfull !!"})
    }catch(error){
        next(error);
    }
};