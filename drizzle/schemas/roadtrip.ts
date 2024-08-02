import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { eventSchema } from "./event";
import { locationSchema } from "./location";

export const roadtripSchema = sqliteTable("roadtrip", {
  fingerprint: text("fingerprint")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  lat: integer("lat").notNull(),
  lng: integer("lng").notNull(),
});

export const roadtripRelations = relations(roadtripSchema, ({ many }) => ({
  locations: many(locationSchema),
  events: many(eventSchema),
}));
