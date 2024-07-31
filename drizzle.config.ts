import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schemas/*",
  dialect: "sqlite",
  out: "./drizzle",
  driver: "turso",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
