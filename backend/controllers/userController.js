import *  as userService from "../services/userService.js"

export const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const currentUser = req.user;
  
    const user = await userService.createUser(userData, currentUser);
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user,
    });
    
  } catch (error) {
    return next(error)
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers(req.user, req.query);
    return res.status(200).json({
      success: true,
      count: users.length,
      message: "Users fetched successfully.",
      users,
    });
  } catch (error) {
    return next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      user,
    });
  } catch (error) {
    return next(error)
  }
}

export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const currentUser = req.user;
  
    const user = await userService.updateUserStatus(id, isActive, currentUser);
    return res.status(200).json({
      success: true,
      message: "User status updated successfully.",
      user,
    });
    
  } catch (error) {
    return next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;
  
    await userService.deleteUser(id, currentUser);
    return res.status(200).json({
      success: true,
      "message": "User deleted successfully.",
    })
  } catch (error) {
    return next(error)
  }
}