import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
} 

export default connectDB;