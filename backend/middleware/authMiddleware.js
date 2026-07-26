import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.js";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Read the cookie
    const token = req.cookies.accessToken;

    // If no cookie
    if (!token) {
      throw new ApiError(401, "Unauthorized. Please log in again.");
    }
    
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Finding User
    const user = await User.findById(decoded.id)
    
    if (!user) {
      throw new ApiError(401, "Unauthorized. Please log in again.");
    }

    req.user = user;

    return next();

  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }

    return next(
      new ApiError(401, "Unauthorized. Please log in again.")
    )
  }
}