import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://saswatrmohanty:WUvJGM2ztrfzdntz@cluster0.xht9t.mongodb.net/');
    console.log('MongoDB connected============================');
  } catch (err) {
    console.error(err.message,"-----------------error-------------");
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
