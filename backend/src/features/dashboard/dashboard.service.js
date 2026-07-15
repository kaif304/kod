import { query } from "../../config/db.js";
import { dashboardSql } from "./dashboard.sql.js";

export const getDashboardOverview = async () => {
  const [
    packageStatsResult,
    leadStatsResult,
    recentLeadsResult,
  ] = await Promise.all([
    query(dashboardSql.packageStats),
    query(dashboardSql.leadStats),
    query(dashboardSql.recentLeads),
  ]);

  const packageStats = packageStatsResult.rows[0];
  const leadStats = leadStatsResult.rows[0];

  return {
    stats: {
      packages: {
        total: packageStats.total,
        published: packageStats.published,
        draft: packageStats.draft,
        archived: packageStats.archived,
      },

      leads: {
        total: leadStats.total,
        new: leadStats.new,
        contacted: leadStats.contacted,
        quoted: leadStats.quoted,
        won: leadStats.won,
        lost: leadStats.lost,
      },
    },

    recentLeads: recentLeadsResult.rows.map((lead) => ({
      id: lead.id,
      customerName: lead.customer_name,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
      contactMode: lead.contact_mode,
      packageTitle: lead.package_title,
      createdAt: lead.created_at,
    })),
  };
};






// import { query } from "../../config/db.js";

// export const getDashboardOverview = async () => {
//   const [packagesResult, leadsResult, paymentsResult, recentLeadsResult] =
//     await Promise.all([
//       query(
//         "SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = 'published')::int AS published FROM packages",
//       ),
//       query(
//         "SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = 'new')::int AS fresh FROM leads",
//       ),
//       query(
//         "SELECT COUNT(*)::int AS total, COALESCE(SUM(amount) FILTER (WHERE payment_status = 'success'), 0)::numeric AS revenue FROM payments",
//       ),
//       query(`
//         SELECT
//           l.id,
//           l.customer_name,
//           l.phone,
//           l.status,
//           l.contact_mode,
//           l.created_at,
//           p.title AS package_title
//         FROM leads l
//         LEFT JOIN packages p ON p.id = l.package_id
//         ORDER BY l.created_at DESC
//         LIMIT 5
//       `),
//     ]);

//   return {
//     stats: {
//       totalPackages: packagesResult.rows[0]?.total || 0,
//       publishedPackages: packagesResult.rows[0]?.published || 0,
//       totalLeads: leadsResult.rows[0]?.total || 0,
//       freshLeads: leadsResult.rows[0]?.fresh || 0,
//       totalPayments: paymentsResult.rows[0]?.total || 0,
//       revenueCollected: Number(paymentsResult.rows[0]?.revenue || 0),
//     },
//     recentLeads: recentLeadsResult.rows.map((item) => ({
//       id: item.id,
//       customerName: item.customer_name,
//       phone: item.phone,
//       status: item.status,
//       contactMode: item.contact_mode,
//       packageTitle: item.package_title,
//       createdAt: item.created_at,
//     })),
//   };
// };
