import "dotenv/config";

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const ENV = {
  PORT: Number(process.env.PORT) || 5000,
  HOST: process.env.HOST ?? "localhost",
  NODE_ENV: process.env.NODE_ENV ?? "development",

  DATABASE_URL: getEnv("DATABASE_URL"),
  REDIS_URL: getEnv("REDIS_URL"),
  JWT_SECRET: getEnv("JWT_SECRET"),

  CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:3000",
} as const;
