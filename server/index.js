import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/index.js';
import errorMiddleware from './middleware/error-middleware.js'

env.config();
const PORT = process.env.PORT || 5000;
const app = express();

// middleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(process.env.API_LINK, router);
app.use(errorMiddleware);


const start = async () => {
    try {
        try {
            await mongoose
                .connect(
                    process.env.DB_URL,
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    },
                );
            console.log('DB ok');
        } catch (e) {
            console.log('Db error:', e);
        } 
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();