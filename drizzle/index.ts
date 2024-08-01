import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { eventSchema } from "./schemas/event";
import { locationSchema } from "./schemas/location";
import { roadtripSchema } from "./schemas/roadtrip";

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, {
  logger: true,
  schema: {
    event: eventSchema,
    location: locationSchema,
    roadtrip: roadtripSchema,
  },
});
