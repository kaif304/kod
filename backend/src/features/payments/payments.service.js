import { query } from "../../config/db.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { MESSAGES } from "../../constants/messages.js";
import { PAYMENT_STATUS } from "../../constants/paymentStatus.js";
import { env } from "../../config/env.js";
import { AppError } from "../../utils/app-error.js";
import { createTransactionId } from "../../utils/helpers.js";
import { paymentsSql } from "./payments.sql.js";

const serializePayment = (row) => ({
  id: row.id,
  leadId: row.lead_id,
  amount: Number(row.amount),
  paymentStatus: row.payment_status,
  transactionId: row.transaction_id,
  customerName: row.customer_name,
  phone: row.phone,
  packageTitle: row.package_title,
  createdAt: row.created_at,
});

export const createPaymentOrder = async ({ leadId, amount }) => {
  const { rows } = await query(paymentsSql.insertPayment, [
    leadId,
    amount || env.defaultTokenAmount,
    PAYMENT_STATUS.PENDING,
    createTransactionId(),
  ]);

  return serializePayment(rows[0]);
};

export const verifyPayment = async ({ paymentId, paymentStatus, transactionId }) => {
  const { rows } = await query(paymentsSql.updatePayment, [
    paymentId,
    paymentStatus,
    transactionId,
  ]);

  if (!rows[0]) {
    throw new AppError(MESSAGES.PAYMENT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return serializePayment(rows[0]);
};

export const getPayments = async () => {
  const { rows } = await query(paymentsSql.selectAll);
  return rows.map(serializePayment);
};
