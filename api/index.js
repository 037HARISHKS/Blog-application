import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log(`MongoDB is connected !!`);
})
.catch((err) => {
    console.log(err);
});
const app = express();
app.use(express.json());


app.listen(4000, () => {
    console.log(`Server is Running on port 4000!!`);
})

app.use('/api/user/',UserRouter)
app.use('/api/auth/',authRouter)


app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500 ;
    const message = err.message || "internal server error";
    res.status(statusCode).json({
        success :false,
        statusCode,
        message
    });
});