/*
import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: '9f2ef551-64c5-4299-aeaa-af5d61998630',
    token: process.env.DATABASE_AUTH_TOKEN!,
  },
} satisfies Config;
 */

import { defineConfig } from "drizzle-kit";

// Env vars are injected by dotenv-cli (see package.json scripts).
// Never hardcode a .env file here — the script determines the target DB.
const url       = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url)       throw new Error("DATABASE_URL is not set");
if (!authToken) throw new Error("DATABASE_AUTH_TOKEN is not set");

console.log("drizzle-kit → DB:", url);

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: { url, authToken },
  verbose: true,
  strict: true,
});



