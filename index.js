import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';  
import connectDB from './Database/dbConfig.js';
import authRouter from './Routers/user.router.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res
    .status(200)
    .send('Welcome to Authentication and Authorization using JWT');
});

app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running`);
}   
);

