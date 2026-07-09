import { PACKAGE_STATUS } from "../../constants/packageStatus.js";
import { LEAD_STATUS } from "../../constants/leadStatus.js";

export const dashboardSql = {
  packageStats: `
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (
        WHERE status = '${PACKAGE_STATUS.PUBLISHED}'
      )::int AS published,
      COUNT(*) FILTER (
        WHERE status = '${PACKAGE_STATUS.DRAFT}'
      )::int AS draft,
      COUNT(*) FILTER (
        WHERE status = '${PACKAGE_STATUS.ARCHIVED}'
      )::int AS archived
    FROM packages
  `,

  leadStats: `
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (
        WHERE status = '${LEAD_STATUS.NEW}'
      )::int AS new,
      COUNT(*) FILTER (
        WHERE status = '${LEAD_STATUS.CONTACTED}'
      )::int AS contacted,
      COUNT(*) FILTER (
        WHERE status = '${LEAD_STATUS.QUOTED}'
      )::int AS quoted,
      COUNT(*) FILTER (
        WHERE status = '${LEAD_STATUS.WON}'
      )::int AS won,
      COUNT(*) FILTER (
        WHERE status = '${LEAD_STATUS.LOST}'
      )::int AS lost
    FROM leads
  `,

  recentLeads: `
    SELECT
      l.id,
      l.customer_name,
      l.email,
      l.phone,
      l.contact_mode,
      l.status,
      l.created_at,
      p.title AS package_title
    FROM leads l
    LEFT JOIN packages p
      ON p.id = l.package_id
    ORDER BY l.created_at DESC
    LIMIT 5
  `,
};