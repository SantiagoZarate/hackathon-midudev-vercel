import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import schema from "./schemas";

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, {
  logger: true,
  schema,
});
