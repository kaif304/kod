import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { AppError } from "../utils/app-error.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const requireAuth = (req, _res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    next(new AppError(
      MESSAGES.UNAUTHORIZED, 
      HTTP_STATUS.UNAUTHORIZED
    ));
    return;
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(new AppError(
      MESSAGES.UNAUTHORIZED, 
      HTTP_STATUS.UNAUTHORIZED
    ));
  }
};

export const authorizeRoles = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    next(new AppError(
      MESSAGES.FORBIDDEN,
      HTTP_STATUS.FORBIDDEN
    ));
    return;
  }

  next();
};
