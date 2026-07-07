import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.databaseSsl ? { rejectUnauthorized: false } : false,
});

export const query = (text, params) => pool.query(text, params);

export const getClient = () => pool.connect();  


(async () => {
  try {
    const client = await pool.connect();

    console.log("✅ PostgreSQL connected successfully.");

    client.release();
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL.");
    console.error(error.message);
    process.exit(1);
  }
})();
