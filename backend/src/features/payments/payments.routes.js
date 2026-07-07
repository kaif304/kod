import { Router } from "express";
import {
  createPaymentOrderEntry,
  getPaymentEntries,
  verifyPaymentEntry,
} from "./payments.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createPaymentSchema,
  verifyPaymentSchema,
} from "./payments.validation.js";
import {
  authorizeRoles,
  requireAuth,
} from "../../middleware/auth.middleware.js";
import { ROLES } from "../../constants/roles.js";

const router = Router();

router.post("/order", validate(createPaymentSchema), createPaymentOrderEntry);
router.post("/verify", validate(verifyPaymentSchema), verifyPaymentEntry);
router.get(
  "/",
  requireAuth,
  authorizeRoles(ROLES.ADMIN, ROLES.MANAGER),
  getPaymentEntries,
);

export default router;
