import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = 3000;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster.3gqbb1w.mongodb.net/`;

export const config = {
    mongo:{
        url:MONGODB_URL
    },
    server:{
        port:SERVER_PORT
    }
}
