import { HTTP_STATUS } from "../constants/httpStatus.js";

export const notFoundHandler = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
    details: error.details || null,
  });
};
