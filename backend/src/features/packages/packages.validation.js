import { z } from "zod";

const itinerarySchema = z.object({
  dayNumber: z.coerce.number().int().positive(),
  title: z.string().min(3).max(180),
  description: z.string().min(10),
});

export const packageQuerySchema = z.object({
  search: z.string().optional(),
  destination: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  duration: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export const packageParamsSchema = z.object({
  slug: z.string().min(2).optional(),
  id: z.string().uuid().optional(),
});

export const packageSchema = z.object({
  title: z.string().min(4).max(180),
  slug: z.string().optional(),
  description: z.string().min(20),
  price: z.coerce.number().nonnegative(),
  duration: z.coerce.number().int().positive(),
  startingLocation: z.string().min(2).max(120),
  destination: z.string().min(2).max(120),
  coverImage: z.string().url(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  itinerary: z.array(itinerarySchema).default([]),
});