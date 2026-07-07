import { Router } from "express";
import { login, logout, refresh } from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { loginSchema } from "./auth.validation.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", requireAuth, logout);

export default router;
