import mongoose from "mongoose"
import ApiError from "../errors/ApiError.js"

export const validateObjectId = (id, resourceName) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid ${resourceName} ID.`)
  }
}