import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.TSC_DB_CNN as string);
    console.log('🚀DataBase is running!');
  } catch (error) {
    console.log(error);
    throw new Error('Could not connect to MongoDB. Please try again');
  }
};

export default dbConnection;
