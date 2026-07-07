import { query } from "../../config/db.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { MESSAGES } from "../../constants/messages.js";
import { AppError } from "../../utils/app-error.js";
import { normalizePagination } from "../../utils/helpers.js";
import { leadsSql } from "./leads.sql.js";

const serializeLead = (row) => ({
  id: row.id,
  packageId: row.package_id,
  packageTitle: row.package_title,
  packageSlug: row.package_slug,
  customerName: row.customer_name,
  email: row.email,
  phone: row.phone,
  travelers: row.travelers,
  message: row.message,
  contactMode: row.contact_mode,
  source: row.source,
  status: row.status,
  createdAt: row.created_at,
});

export const createLead = async (payload) => {
  const { rows } = await query(leadsSql.insertLead, [
    payload.packageId || null,
    payload.customerName,
    payload.email || null,
    payload.phone,
    payload.travelers,
    payload.message || null,
    payload.contactMode,
    payload.source,
    payload.status,
  ]);

  return serializeLead(rows[0]);
};

export const getLeads = async (filters) => {
  const pagination = normalizePagination(filters);
  const values = [];
  const clauses = [];

  if (filters.status) {
    values.push(filters.status);
    clauses.push(`l.status = $${values.length}`);
  }

  const whereClause = clauses.length > 0 ? ` WHERE ${clauses.join(" AND ")}` : "";
  const limitParam = values.push(pagination.limit);
  const offsetParam = values.push(pagination.offset);
  const listQuery = `${leadsSql.selectAll}${whereClause} ORDER BY l.created_at DESC LIMIT $${limitParam} OFFSET $${offsetParam}`;
  const countQuery = `SELECT COUNT(*)::int AS total FROM leads l${whereClause}`;

  const [{ rows }, countResult] = await Promise.all([
    query(listQuery, values),
    query(countQuery, values.slice(0, values.length - 2)),
  ]);

  return {
    items: rows.map(serializeLead),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: countResult.rows[0]?.total || 0,
    },
  };
};

export const updateLeadStatus = async (id, status) => {
  const { rows } = await query(leadsSql.updateStatus, [id, status]);

  if (!rows[0]) {
    throw new AppError(MESSAGES.LEAD_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return serializeLead(rows[0]);
};
