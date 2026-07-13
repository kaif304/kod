import { Router } from "express";
import {
  createSinglePackage,
  deleteSinglePackage,
  getAdminPackages,
  getAllPackages,
  getSinglePackage,
  getSinglePackageById,
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

// User Request

router.get(
  "/", 
  validate(packageQuerySchema, "query"), 
  getAllPackages
);

// Admin Routes

router.get(
  "/admin/packages",
  requireAuth,
  authorizeRoles(ROLES.ADMIN, ROLES.MANAGER),
  validate(packageQuerySchema, "query"),
  getAdminPackages,
);

router.get(
  "/admin/packages/:id",
  requireAuth,
  authorizeRoles("admin"),
  validate(packageParamsSchema, "params"),
  getSinglePackageById
);

router.get(
  "/:slug", 
  validate(packageParamsSchema, "params"), 
  getSinglePackage
);

router.post(
  "/admin/packages",
  requireAuth,
  authorizeRoles(ROLES.ADMIN, ROLES.MANAGER),
  validate(packageSchema),
  createSinglePackage,
);

router.patch(
  "/admin/packages/:id",
  requireAuth,
  authorizeRoles(ROLES.ADMIN, ROLES.MANAGER),
  validate(packageParamsSchema, "params"),
  validate(packageSchema),
  updateSinglePackage,
);

router.delete(
  "/admin/packages/:id",
  requireAuth,
  authorizeRoles(ROLES.ADMIN),
  validate(packageParamsSchema, "params"),
  deleteSinglePackage,
);

export default router;
