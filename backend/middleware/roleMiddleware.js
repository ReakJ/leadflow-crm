import ApiError from "../errors/ApiError.js";

/**
 * Authorization middleware.
 * Must be used after the protect middleware.
 */

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (roles.length === 0) {
      throw new ApiError(500, "At least one role required.");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You don't have permission to perform this action.");
    }
    
    return next();
  }
}