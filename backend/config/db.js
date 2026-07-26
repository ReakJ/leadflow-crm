import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);
    throw error;
  }
} 

export default connectDB;

export const disconnectDB = async () => {
  await mongoose.connection.close();
}
