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