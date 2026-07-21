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
