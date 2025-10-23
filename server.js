import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import routes from './routes/index.js';

const PORT = process.env.PORT || 3001;
const MongoDBURI = process.env.MONGODB_URI;

try{
    const app = express();
    //API middelwware
    app.use(express.json());
    app.use(cookieParser());
    //Router
    app.use(routes);

    if(!MongoDBURI){
        console.log('\x1b[31m--MongoDB URI is not defined--\x1b[0m');
        process.exit(1);
    }
    await mongoose.connect(MongoDBURI);
    console.log('\x1b[34m--Connected to MongoDB--\x1b[0m');
    await app.listen(PORT, () => {
        console.log(`\x1b[34m--Server is running on port ${process.env.PORT || 3005}--\x1b[0m`);
    });
}catch(e){
    console.log(`\x1b[31m${e.message}\x1b[0m`);
}