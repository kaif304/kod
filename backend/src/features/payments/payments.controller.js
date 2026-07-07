import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { asyncHandler } from "../../utils/async-handler.js";
import {
  createPaymentOrder,
  getPayments,
  verifyPayment,
} from "./payments.service.js";

export const createPaymentOrderEntry = asyncHandler(async (req, res) => {
  const data = await createPaymentOrder(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Payment order created",
    data,
  });
});

export const verifyPaymentEntry = asyncHandler(async (req, res) => {
  const data = await verifyPayment(req.body);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Payment updated",
    data,
  });
});

export const getPaymentEntries = asyncHandler(async (_req, res) => {
  const data = await getPayments();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data,
  });
});
