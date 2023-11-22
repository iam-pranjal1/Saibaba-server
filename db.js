import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const connectionDB = async () => {
  try {
    // Use async/await to connect to the MongoDB database
    const connect = await mongoose.connect(process.env.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });

    // Log a success message with the connected host
    console.log(`Connected to the database successfully on ${connect.connection.host}`);
  } catch (error) {
    // Log an error message if there's an issue with the connection
    console.log(`Error in connecting to MongoDB: ${error}`);
  }
};

export default connectionDB;
