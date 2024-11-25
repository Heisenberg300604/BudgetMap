import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import userRouter from "./Routes/auth.routes.js"

// load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Hello Javascript!');
});

// Connect to database
connectDB();

// using the routes
app.use("/api/v1",userRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});