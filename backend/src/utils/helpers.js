import slugify from "slugify";

export const createSlug = (value) =>
  slugify(value, { lower: true, strict: true, trim: true });

export const createTransactionId = () =>
  `KOD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export const sanitizeArray = (value = []) =>
  Array.isArray(value) ? value.filter(Boolean) : [];

export const sanitizeFaqs = (value = []) =>
  Array.isArray(value)
    ? value
        .filter((item) => item?.question && item?.answer)
        .map((item) => ({
          question: item.question,
          answer: item.answer,
        }))
    : [];

export const normalizePagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 9, 1), 50);

  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
};
