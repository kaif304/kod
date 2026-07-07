import { env } from "../../config/env.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { asyncHandler } from "../../utils/async-handler.js";
import {
  loginAdmin,
  logoutAdmin,
  refreshAdminSession,
} from "./auth.service.js";

const refreshCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.nodeEnv === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const login = asyncHandler(async (req, res) => {
  const session = await loginAdmin(req.body);

  const { refreshToken, ...responseData } = session;

  res.cookie(
    "kod_refresh_token",
    refreshToken,
    refreshCookieOptions
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Login successful",
    data: responseData,
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const session = await refreshAdminSession(
    req.cookies.kod_refresh_token
  );

  const { refreshToken, ...responseData } = session;

  res.cookie(
    "kod_refresh_token", 
    session.refreshToken, 
    refreshCookieOptions
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Session refreshed",
    data: responseData,
  });
});

export const logout = asyncHandler(async (req, res) => {
  await logoutAdmin(req.user.id);

  res.clearCookie("kod_refresh_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: env.nodeEnv === "production",
  });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Logged out successfully",
  });
});
