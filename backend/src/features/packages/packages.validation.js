import { z } from "zod";

const itinerarySchema = z.object({
  dayNumber: z.coerce.number().int().positive(),
  title: z.string().min(3).max(180),
  description: z.string().min(10),
});

const faqSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(5),
});

export const packageQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  destination: z.string().optional(),
  status: z.string().optional(),
  duration: z.string().optional(),
  minBudget: z.string().optional(),
  maxBudget: z.string().optional(),
  featured: z.string().optional(),
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
  galleryImages: z.array(z.string().url()).default([]),
  category: z.string().min(2).max(80),
  highlights: z.array(z.string().min(2)).default([]),
  inclusions: z.array(z.string().min(2)).default([]),
  exclusions: z.array(z.string().min(2)).default([]),
  faqs: z.array(faqSchema).default([]),
  isFeatured: z.boolean().default(false),
  tokenAmount: z.coerce.number().nonnegative().default(5000),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  itinerary: z.array(itinerarySchema).default([]),
});
