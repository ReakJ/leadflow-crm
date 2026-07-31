import User from "../models/User.js";
import generateJwt from "../utils/generateJwt.js";
import ApiError from "../errors/ApiError.js";

export const login = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();
  
  const user = await User.findOne({
    email: normalizedEmail,
    isDeleted: false,
    isActive: true,
  }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }
  
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateJwt(user._id);

  return {
    user: user.toSafeObject(),
    token,
  }
}