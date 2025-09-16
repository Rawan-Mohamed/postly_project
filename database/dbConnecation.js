import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/postly_proj_db';
        console.log('MongoDB URI:', mongoUri);
        console.log('Environment variables loaded:', {
            MONGODB_URI: process.env.MONGODB_URI,
            NODE_ENV: process.env.NODE_ENV
        });
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.log("Error connecting to the database", error);
    }
};

export default dbConnection;