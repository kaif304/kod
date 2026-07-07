export const paymentsSql = {
  insertPayment: `
    INSERT INTO payments (lead_id, amount, payment_status, transaction_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `,
  updatePayment: `
    UPDATE payments
    SET payment_status = $2, transaction_id = $3
    WHERE id = $1
    RETURNING *
  `,
  selectAll: `
    SELECT
      pm.*,
      l.customer_name,
      l.phone,
      p.title AS package_title
    FROM payments pm
    INNER JOIN leads l ON l.id = pm.lead_id
    LEFT JOIN packages p ON p.id = l.package_id
    ORDER BY pm.created_at DESC
  `,
};
