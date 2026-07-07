import { Router } from "express";
import {
  createLeadEntry,
  getLeadEntries,
  updateLeadEntryStatus,
} from "./leads.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import {
  createLeadSchema,
  leadQuerySchema,
  leadStatusSchema,
  updateLeadStatusSchema,
} from "./leads.validation.js";

import {
  authorizeRoles,
  requireAuth,
} from "../../middleware/auth.middleware.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.post("/", validate(createLeadSchema), createLeadEntry);

router.get(
  "/",
  requireAuth,
  authorizeRoles(ROLES.ADMIN, ROLES.MANAGER),
  validate(leadQuerySchema, "query"),
  getLeadEntries,
);

router.patch(
  "/:id/status",
  requireAuth,
  authorizeRoles(ROLES.ADMIN, ROLES.MANAGER),
  validate(leadStatusSchema, "params"),
  validate(updateLeadStatusSchema),
  updateLeadEntryStatus,
);

export default router;
