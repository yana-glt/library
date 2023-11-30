import express ,{Express} from 'express';
import dotenv from 'dotenv';
import mongoose, {Connection} from 'mongoose';
import {config} from './config/config';
import indexRouter from './routers/indexRoute';
import authorRouter from './routers/authorRoute';
import bookRouter from './routers/bookRoute';

dotenv.config()
const app:Express = express();

mongoose.connect(config.mongo.url);
const db:Connection = mongoose.connection;
db.on('error', (err:string) => {console.log(err)});
db.once('open', ():void => {
    console.log('DB connected successfully');
    start();
})

app.use('/', indexRouter);
app.use('/author', authorRouter);
app.use('/book', bookRouter);

const start = ():void =>{
    app.listen(config.server.port, ():void => {
        console.log('Server is running')
    });
}