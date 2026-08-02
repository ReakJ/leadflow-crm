import ApiError from "../errors/ApiError.js";
import Lead from "../models/Lead.js";
import User, { USER_ROLES } from "../models/User.js";
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

export const getUsers = async (query) => {
  const {
    deleted, 
    active, 
    role,
    search,
    sort,
    order,
    page,
    limit
  } = query;

  const filter = {};


  const allowedDeletedValues = [
    "true",
    "false",
    "all"
  ];

  if (deleted && !allowedDeletedValues.includes(deleted)) {
    throw new ApiError(400, "Invalid deleted query parameter.");
  }

  if (deleted === undefined || deleted === "false") {
    filter.isDeleted = false;
  } else if (deleted === "true") {
    filter.isDeleted = true;
  }


  const allowedActiveValues = [
    "true",
    "false"
  ];

  if (active && !allowedActiveValues.includes(active)) {
    throw new ApiError(400, "Invalid active query parameter.");
  }

  if (active === "true") {
    filter.isActive = true;
  } else if (active === "false"){
    filter.isActive = false;
  }


  if (role && !USER_ROLES.includes(role)) {
    throw new ApiError(400, "Invalid role query parameter.");
  }

  if (role) {
   filter.role = role; 
  }


  if(search) {
    const regex = new RegExp(search, "i");
    filter.$or = [
      {
        name: regex
      },
      {
        email: regex
      },
    ]
  }


  const allowedSortFields = [
    "name",
    "email",
    "createdAt"
  ];

  const allowedOrderValues = [
    "asc",
    "desc"
  ];

  if (sort && !allowedSortFields.includes(sort)) {
    throw new ApiError(400, "Invalid sort query parameter.");
  }

  if (order && !allowedOrderValues.includes(order)) {
    throw new ApiError(400, "Invalid order query parameter.");
  }

  let sortOptions = {
    createdAt: -1
  };

  if (sort) {
    sortOptions = {
      [sort]: order === "desc" ? -1 : 1
    };
  }


  const pageNumber = page ? Number(page) : 1 ;
  let limitNumber = limit ? Number(limit) : 10;

  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    throw new ApiError(400, "Invalid page query parameter.")
  }

  if (Number.isNaN(limitNumber) || limitNumber < 1) {
    throw new ApiError(400, "Invalid limit query parameter.")
  }

  if(limitNumber > 100) {
    limitNumber = 100;
  }

  const skip = (pageNumber - 1) * limitNumber;


  const users = await User.find(filter).sort(sortOptions).skip(skip).limit(limitNumber);
  const totalItems = await User.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limitNumber);


  return {
    users: users.map(user => user.toSafeObject()),
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      totalItems,
      totalPages
    }
  } 
  
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

export const restoreUser = async (userId, currentUser) => {
  validateObjectId(userId, "user");

  const user = await User.findOne({ 
    _id: userId,
    isDeleted: true 
  })

  if (!user) {
    throw new ApiError(404, "User not found.")
  }

  if (currentUser.role === "manager" && user.role !== "member") {
    throw new ApiError(403, "Manager can only restore members.");
  }

  user.isDeleted = false;
  user.deletedAt = null;
  user.deletedBy = null;

  await user.save();
}