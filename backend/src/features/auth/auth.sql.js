export const authSql = {
  findAdminByEmail: `
    SELECT
      id,
      name,
      email,
      mobile_number,
      password_hash,
      role
    FROM admins
    WHERE email = $1
    LIMIT 1
  `,

  findAdminById: `
    SELECT
      id,
      name,
      email,
      mobile_number
    FROM admins
    WHERE id = $1
    LIMIT 1
  `,

  updateRefreshToken: `
    UPDATE admins
    SET refresh_token = $2
    WHERE id = $1
  `,
};