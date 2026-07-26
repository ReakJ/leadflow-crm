import dotenv from "dotenv";

import connectDB, { disconnectDB } from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const requiredEnv = [
  "ADMIN_NAME",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const seedAdmin = async () => {
  try {
    console.log("🌱 Starting admin seeding...")
    
    await connectDB();
    console.log("✅ Connected to MongoDB")

    const adminExists = await User.findOne({email: process.env.ADMIN_EMAIL});
    if (adminExists) {
      console.log("ℹ️ Admin already exists.");
      console.log("🎉 Nothing to do.");
      return;
    }

    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin", 
    });
    console.log("✅ Admin account created successfully.");
    console.log(`📧 Email: ${process.env.ADMIN_EMAIL}`);
    console.log("🎉 Seeding completed.");

  } catch (error) {
    console.error("❌ Failed to seed admin.");
    console.error(error);
  } finally {
    await disconnectDB();
  }
}

seedAdmin().catch((error) => {
    console.error(error);
    process.exit(1);
});