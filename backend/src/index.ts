import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectToDB from './utils/connection';
import userRoutes from './routes/user'
import path from 'path'



dotenv.config();

const app = express()
app.use('/images', express.static(path.join(__dirname, 'assets', 'images')));

app.use(cors({
    credentials:true
}))
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))





//**port */

const server = http.createServer(app)

//listening to port
server.listen(8081,()=>{
    console.log('server running on http://localhost:8080/')
})

//connecting to the database
connectToDB()

app.use('/api',userRoutes)

