import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/index.js';

env.config();
const PORT = process.env.PORT || 5000;
const app = express();

// midleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log(error);
    }
};

start();