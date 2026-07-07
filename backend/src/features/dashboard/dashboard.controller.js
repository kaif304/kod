import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { getDashboardOverview } from "./dashboard.service.js";

export const getDashboardSnapshot = asyncHandler(async (_req, res) => {
  const data = await getDashboardOverview();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data,
  });
});
