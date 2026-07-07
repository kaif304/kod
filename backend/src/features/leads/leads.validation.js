import { z } from "zod";

export const createLeadSchema = z.object({
  packageId: z.string().uuid().nullable().optional(),
  customerName: z.string().min(2).max(120),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(10).max(20),
  travelers: z.coerce.number().int().positive().default(1),
  message: z.string().max(1200).optional().or(z.literal("")),
  contactMode: z.enum(["inquiry", "call_request", "whatsapp_request", "book_now"]).default("inquiry"),
  source: z.enum(["website", "package_page", "contact_page", "campaign"]).default("website"),
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]).default("new"),
});

export const leadQuerySchema = z.object({
  status: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export const leadStatusSchema = z.object({
  id: z.string().uuid(),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]),
});
