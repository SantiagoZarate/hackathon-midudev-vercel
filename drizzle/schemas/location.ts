import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { roadtripSchema } from "./roadtrip";
import { nanoid } from "nanoid";

export const locationSchema = sqliteTable("location", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  description: text("description").notNull(),
  exact_location: text("exact_location").notNull(),
  aproximate_distance_in_km: integer("aproximate_distance_in_km").notNull(),
  lat: integer("lat").notNull(),
  lng: integer("lng").notNull(),
  type: text("type").notNull(),
  roadtripFingerprint: text("roadtripFingerprint")
    .references(() => roadtripSchema.fingerprint, { onDelete: "cascade" })
    .notNull(),
});

export const locationRelations = relations(locationSchema, ({ one }) => ({
  roadtrip: one(roadtripSchema, {
    fields: [locationSchema.roadtripFingerprint],
    references: [roadtripSchema.fingerprint],
    relationName: "roadtrip",
  }),
}));
