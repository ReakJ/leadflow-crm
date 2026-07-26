export const errorMiddleware = (err, req, res, next) => {
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const isDevelopment = process.env.NODE_ENV === "development";
  const response = {
    success: false,
    message
  }

  if (isDevelopment) {
    response.stack = err.stack;  
  }

  return res.status(statusCode).json(response);
} 