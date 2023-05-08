import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
// opens a connection to mongodb
//what is synchronous JS
//async is all about promise
//what is asynchornous JS

//connecting to the mongoDb Database using mongoose

// dotenv.config();

const connectDB = async (uri) => {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

            // useCreateIndex: true,
        });
        console.log('MongoDB connected', conn.connection.host);
    } catch (err) {
        console.log(err);
    }
};

//by exporting , this function becmoes available in other files to use
export default connectDB;
