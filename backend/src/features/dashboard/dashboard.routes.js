import { Router } from "express";
import { getDashboardSnapshot } from "./dashboard.controller.js";
import {
  authorizeRoles,
  requireAuth,
} from "../../middleware/auth.middleware.js";
import { ROLES } from "../../constants/roles.js";

const router = Router();

router.get(
  "/overview",
  requireAuth,
  authorizeRoles(ROLES.ADMIN, ROLES.MANAGER),
  getDashboardSnapshot,
);

export default router;
