import { Router } from "express";
import {
  createSinglePackage,
  deleteSinglePackage,
  getAdminPackages,
  getAllPackages,
  getSinglePackage,
  updateSinglePackage,
} from "./packages.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  packageParamsSchema,
  packageQuerySchema,
  packageSchema,
} from "./packages.validation.js";
import {
  authorizeRoles,
  requireAuth,
} from "../../middleware/auth.middleware.js";
import { ROLES } from "../../constants/roles.js";

const router = Router();

router.get("/", validate(packageQuerySchema, "query"), getAllPackages);
router.get(
  "/admin/list",
  requireAuth,
  authorizeRoles(ROLES.ADMIN, ROLES.MANAGER),
  validate(packageQuerySchema, "query"),
  getAdminPackages,
);
router.get("/:slug", validate(packageParamsSchema, "params"), getSinglePackage);
router.post(
  "/",
  requireAuth,
  authorizeRoles(ROLES.ADMIN, ROLES.MANAGER),
  validate(packageSchema),
  createSinglePackage,
);
router.patch(
  "/:id",
  requireAuth,
  authorizeRoles(ROLES.ADMIN, ROLES.MANAGER),
  validate(packageParamsSchema, "params"),
  validate(packageSchema),
  updateSinglePackage,
);
router.delete(
  "/:id",
  requireAuth,
  authorizeRoles(ROLES.ADMIN),
  validate(packageParamsSchema, "params"),
  deleteSinglePackage,
);

export default router;
