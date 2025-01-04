import mongoose from 'mongoose';

const connectDB = async () => {

  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('MONGO_URI is not defined in the environment variables.');
    process.exit(1); // Exit the process with a failure
  }
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error('An unknown error occurred during database connection.');
    }
    process.exit(1); // Exit the process with a failure
  }
};

export default connectDB;
