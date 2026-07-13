import { getClient, query } from "../../config/db.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { MESSAGES } from "../../constants/messages.js";
import { AppError } from "../../utils/app-error.js";
import {
  createSlug,
  normalizePagination,
  sanitizeArray,
  sanitizeFaqs,
} from "../../utils/helpers.js";
import { packagesSql } from "./packages.sql.js";

const serializePackage = (row) => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  description: row.description,
  price: Number(row.price),
  duration: row.duration,
  startingLocation: row.starting_location,
  destination: row.destination,
  coverImage: row.cover_image,
  status: row.status,
  createdAt: row.created_at,
  itinerary: row.itinerary || [],
});

const buildWhereClause = (filters, values) => {
  const clauses = [];

  if (filters.onlyPublished) {
    clauses.push(`p.status = 'published'`);
  } else if (filters.status) {
    values.push(filters.status);
    clauses.push(`p.status = $${values.length}`);
  }

  if (filters.search) {
    values.push(`%${filters.search}%`);
    clauses.push(
      `(p.title ILIKE $${values.length} OR p.description ILIKE $${values.length})`
    );
  }

  if (filters.destination) {
    values.push(`%${filters.destination}%`);
    clauses.push(`p.destination ILIKE $${values.length}`);
  }

  if (filters.duration) {
    values.push(Number(filters.duration));
    clauses.push(`p.duration = $${values.length}`);
  }

  return clauses.length > 0
    ? ` WHERE ${clauses.join(" AND ")}`
    : "";
};

export const getPackages = async (filters, options = { onlyPublished: true }) => {
  const pagination = normalizePagination(filters);
  const values = [];
  const whereClause = buildWhereClause(
    { ...filters, onlyPublished: options.onlyPublished },
    values,
  );
  const limitParam = values.push(pagination.limit);
  const offsetParam = values.push(pagination.offset);

  const listQuery = `${packagesSql.selectAll}${whereClause} ORDER BY p.created_at DESC LIMIT $${limitParam} OFFSET $${offsetParam}`;
  const countQuery = `${packagesSql.countAll}${whereClause}`;

  const [{ rows }, countResult] = await Promise.all([
    query(listQuery, values),
    query(countQuery, values.slice(0, values.length - 2)),
  ]);

  return {
    items: rows.map(serializePackage),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: countResult.rows[0]?.total || 0,
    },
  };
};

export const getPackageBySlug = async (slug) => {
  const { rows } = await query(packagesSql.selectBySlug, [slug]);
  const packageItem = rows[0];

  if (!packageItem) {
    throw new AppError(MESSAGES.PACKAGE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return serializePackage(packageItem);
};

export const getPackageById = async (id) => {
  const { rows } = await query(packagesSql.selectById, [id]);
  const packageItem = rows[0];

  if (!packageItem) {
    throw new AppError(MESSAGES.PACKAGE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return serializePackage(packageItem);
};

const persistItinerary = async (client, packageId, itinerary) => {
  await client.query(packagesSql.deleteItineraryByPackageId, [packageId]);

  for (const item of itinerary) {
    await client.query(packagesSql.insertItineraryItem, [
      packageId,
      item.dayNumber,
      item.title,
      item.description,
    ]);
  }
};

export const createPackage = async (payload) => {
  const client = await getClient();

  try {
    await client.query("BEGIN");

    const slug = payload.slug || createSlug(payload.title);

    const insertResult = await client.query(packagesSql.insertPackage, [
      payload.title,
      slug,
      payload.description,
      payload.price,
      payload.duration,
      payload.startingLocation,
      payload.destination,
      payload.coverImage,
      payload.status,
    ]);

    const packageId = insertResult.rows[0].id;

    await persistItinerary(client, packageId, payload.itinerary);

    await client.query("COMMIT");

    const { rows } = await query(packagesSql.selectById, [packageId]);

    return serializePackage(rows[0]);
  } 
  catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } 
  finally {
    client.release();
  }
};

export const updatePackage = async (id, payload) => {
  const client = await getClient();

  try {
    await client.query("BEGIN");

    const slug = payload.slug || createSlug(payload.title);

    const updateResult = await client.query(packagesSql.updatePackage, [
      id,
      payload.title,
      slug,
      payload.description,
      payload.price,
      payload.duration,
      payload.startingLocation,
      payload.destination,
      payload.coverImage,
      payload.status,
    ]);

    if (updateResult.rowCount === 0) {
      throw new AppError(
        MESSAGES.PACKAGE_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    await persistItinerary(client, id, payload.itinerary);

    await client.query("COMMIT");

    const { rows } = await query(packagesSql.selectById, [id]);

    if (!rows[0]) {
      throw new AppError(
        MESSAGES.PACKAGE_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return serializePackage(rows[0]);
  } 
  catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } 
  finally {
    client.release();
  }
};

export const deletePackage = async (id) => {
  const result = await query(packagesSql.deletePackage, [id]);

  if (result.rowCount === 0) {
    throw new AppError(MESSAGES.PACKAGE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
};
