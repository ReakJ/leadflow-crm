import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generateJwt = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

export default generateJwt;