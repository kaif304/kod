export const leadsSql = {
  insertLead: `
    INSERT INTO leads (
      package_id,
      customer_name,
      email,
      phone,
      travelers,
      message,
      contact_mode,
      source,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `,
  selectAll: `
    SELECT
      l.*,
      p.title AS package_title,
      p.slug AS package_slug
    FROM leads l
    LEFT JOIN packages p ON p.id = l.package_id
  `,
  updateStatus: `
    UPDATE leads
    SET status = $2
    WHERE id = $1
    RETURNING *
  `,
};
