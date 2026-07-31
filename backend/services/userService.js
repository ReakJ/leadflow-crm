import ApiError from "../errors/ApiError.js";
import Lead from "../models/Lead.js";
import User from "../models/User.js";
import { validateObjectId } from "../utils/validateObjectId.js";

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

export const getUserById = async (userId) => {
  validateObjectId(userId, "user");

  const user = await User.findOne({
    _id: userId,
    isDeleted: false,
  })

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user.toSafeObject();
}

export const updateUserStatus = async (userId, isActive, currentUser) => {
  validateObjectId(userId, "user");

  const user = await User.findOne({
    _id: userId,
    isDeleted: false
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (isActive === undefined || isActive === null) {
    throw new ApiError(400, "'isActive' is required.");
  }

  if (typeof isActive !== "boolean") {
    throw new ApiError(400, "'isActive' must be a boolean.");
  }

  if (user._id.equals(currentUser._id)) {
    throw new ApiError(403, "You are not allowed to activate or deactivate your own account.");
  }
  
  if (currentUser.role === "manager" && user.role !== "member") {
    throw new ApiError(403, "Managers can only activate or deactivate member accounts.");
  }

  if (currentUser.role === "admin" && user.role === "admin") {
    throw new ApiError(
      403,
      "Admins cannot activate or deactivate other admin accounts."
    );
  }


  user.isActive = isActive;

  await user.save();

  return user.toSafeObject();
}

export const deleteUser = async (userId, currentUser) => {
  validateObjectId(userId, "User");

  const user = await User.findOne({
    _id: userId,
    isDeleted: false
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (user._id.equals(currentUser._id)) {
    throw new ApiError(403, "You cannot delete your own account.");
  }

  if (currentUser.role === "admin" && user.role === "admin") {
    throw new ApiError(403, "Admins cannot delete other admin accounts.")
  }

  if (currentUser.role === "manager" && user.role !== "member") {
    throw new ApiError(403, "Managers can only delete members.")
  }

  const hasActivateLeads = await Lead.exists({
    assignedTo: user._id,
    isDeleted: false
  })

  if (hasActivateLeads) {
    throw new ApiError(409, "Cannot delete user because they are assigned to active leads. Reassign those leads before deleting the account.");
  }

  user.isDeleted = true;
  user.deletedBy = currentUser._id;
  user.deletedAt = new Date();

  await user.save();
}