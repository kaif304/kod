import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { MESSAGES } from "../../constants/messages.js";
import { query } from "../../config/db.js";
import { AppError } from "../../utils/app-error.js";
import { compareValue, hashValue } from "../../utils/hash.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";
import { authSql } from "./auth.sql.js";

const createAuthPayload = (admin) => ({
  id: admin.id,
  email: admin.email,
  name: admin.name,
  role: admin.role,
});

export const loginAdmin = async ({ email, password }) => {
  const { rows } = await query(authSql.findAdminByEmail, [email]);
  const admin = rows[0];

  if (!admin) {
    throw new AppError(MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
  }

  const isPasswordValid = await compareValue(password, admin.password_hash);

  if (!isPasswordValid) {
    throw new AppError(MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
  }

  const payload = createAuthPayload(admin);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const hashedRefreshToken = await hashValue(refreshToken);

  await query(authSql.updateRefreshToken, [admin.id, hashedRefreshToken]);

  return {
    admin: payload,
    accessToken,
    refreshToken,
  };
};   

export const refreshAdminSession = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new AppError(MESSAGES.REFRESH_TOKEN_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  let decodedToken;

  try {
    decodedToken = verifyRefreshToken(incomingRefreshToken);
  } catch {
    throw new AppError(MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
  }

  const { rows } = await query(authSql.findAdminById, [decodedToken.id]);
  const admin = rows[0];

  const isValid = await compareValue(
    incomingRefreshToken,
    admin.refresh_token
  );

  if (!admin || !isValid) {
    throw new AppError(MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
  }

  const payload = createAuthPayload(admin);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const hashedRefreshToken = await hashValue(refreshToken);

  await query(authSql.updateRefreshToken, [admin.id, hashedRefreshToken]);

  return {
    admin: payload,
    accessToken,
    refreshToken,
  };
};

export const logoutAdmin = async (adminId) => {
  await query(authSql.updateRefreshToken, [adminId, null]);
};
