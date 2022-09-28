import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL ||
        'mongodb+srv://MERN_USER:HSayPC5Afal3p1jU@calendardb.uwhy6oc.mongodb.net/mern_calendar'
    );
    console.log('🚀 DataBase is running!');
  } catch (error) {
    console.log(error);
    throw new Error('Could not connect to MongoDB. Please try again');
  }
};

export default dbConnection;
