import { Router } from "express";
import authRoutes from "./features/auth/auth.routes.js";
import dashboardRoutes from "./features/dashboard/dashboard.routes.js";
import leadRoutes from "./features/leads/leads.routes.js";
import packageRoutes from "./features/packages/packages.routes.js";
import paymentRoutes from "./features/payments/payments.routes.js";
import { env } from "./config/env.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "KOD API is running",
    meta: {
      managerPhone: env.managerPhone,
      managerWhatsapp: env.managerWhatsapp,
    },
  });
});

router.use("/auth", authRoutes);
router.use("/packages", packageRoutes);
router.use("/leads", leadRoutes);
router.use("/payments", paymentRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
