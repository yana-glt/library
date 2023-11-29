import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {config} from './config/config';

dotenv.config()
const app = express();

mongoose.connect(config.mongo.url);
const db = mongoose.connection;
db.on('error', (err) => {console.log(err)});
db.once('open', () => {
    console.log('DB connected successfully');
    start();
})

const start = () =>{
    app.listen(config.server.port, () => {
        console.log('Server is running')
    });
}