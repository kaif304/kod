import "dotenv/config";

const requiredKeys = [
  "DATABASE_URL",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "FRONTEND_URL",
];

for (const key of requiredKeys) {
  if (!process.env[key]) {
    console.warn(
      `[env] Missing environment variable: ${key}`
    );
  }
}

const toBoolean = (
  value,
  fallback = false
) => {
  if (value === undefined) {
    return fallback;
  }

  return value === "true";
};

const toNumber = (
  value,
  fallback
) => {
  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : fallback;
};

export const env = {
  nodeEnv:
    process.env.NODE_ENV ||
    "development",

  isProduction:
    process.env.NODE_ENV ===
    "production",

  port: toNumber(
    process.env.PORT,
    4000
  ),

  databaseUrl:
    process.env.DATABASE_URL || "",

  databaseSsl: toBoolean(
    process.env.DATABASE_SSL,
    false
  ),

  frontendUrl:
    process.env.FRONTEND_URL ||
    "http://localhost:5173",

  accessTokenSecret:
    process.env.ACCESS_TOKEN_SECRET ||
    "access-secret",

  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET ||
    "refresh-secret",

  accessTokenTtl:
    process.env.ACCESS_TOKEN_TTL ||
    "15m",

  refreshTokenTtl:
    process.env.REFRESH_TOKEN_TTL ||
    "7d",

  cookieName:
    process.env.COOKIE_NAME ||
    "kod_refresh_token",

  cookieMaxAge: toNumber(
    process.env.COOKIE_MAX_AGE,
    7 * 24 * 60 * 60 * 1000
  ),

  bcryptSaltRounds: toNumber(
    process.env.BCRYPT_SALT_ROUNDS,
    10
  ),

  managerPhone:
    process.env.MANAGER_PHONE ||
    "919876543210",

  managerWhatsapp:
    process.env.MANAGER_WHATSAPP ||
    "919876543210",

  defaultTokenAmount: toNumber(
    process.env.DEFAULT_TOKEN_AMOUNT,
    5000
  ),

  adminName:
    process.env.ADMIN_NAME ||
    "Super Admin",

  adminEmail:
    process.env.ADMIN_EMAIL ||
    "admin@kod.com",

  adminPassword:
    process.env.ADMIN_PASSWORD ||
    "Admin@123",

  logLevel:
    process.env.LOG_LEVEL ||
    "debug",
};