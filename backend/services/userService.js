import ApiError from "../errors/ApiError.js";
import User from "../models/User.js";

export const createUser = async (userData, currentUser) => {
  const { name, email, password, role } = userData;
  
  if (role === "admin") {
    throw new ApiError(403, "Only the seed process can create admin accounts.");
  }

  if(currentUser.role === "manager" && role !== "member") {
    throw new ApiError(403, "Managers are not allowed to create manager accounts.");
  }

  const existingUser = await User.findOne({ email });

  if(existingUser) {
    throw new ApiError(409, "A user with this email already exists.")
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return user.toSafeObject();
};

export const getUsers = async (currentUser) => {
  const users = await User.find({
    isDeleted: false
  }).sort({ createdAt: -1 });

  return users.map(user => user.toSafeObject());
}