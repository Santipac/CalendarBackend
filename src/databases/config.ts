import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL as string;

const dbConnection = async () => {
  try {
    await mongoose.connect(
      MONGODB_URL ||
        'mongodb+srv://MERN_USER:HSayPC5Afal3p1jU@calendardb.uwhy6oc.mongodb.net/mern_calendar'
    );
    console.log('🚀 DataBase is running!');
  } catch (error) {
    console.log(error);
    throw new Error('Could not connect to MongoDB. Please try again');
  }
};

export default dbConnection;
