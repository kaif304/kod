import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(100),
});

// export const refreshSchema = z.object({
//   refreshToken: z.string().min(10).optional(),
// });
