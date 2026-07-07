import { z } from "zod";

export const createPaymentSchema = z.object({
  leadId: z.string().uuid(),
  amount: z.coerce.number().positive().optional(),
});

export const verifyPaymentSchema = z.object({
  paymentId: z.string().uuid(),
  paymentStatus: z.enum(["pending", "success", "failed", "refunded"]),
  transactionId: z.string().min(4),
});
