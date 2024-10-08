import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { roadtripSchema } from "./roadtrip";
import { relations } from "drizzle-orm";

export const eventSchema = sqliteTable("event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  description: text("name").notNull(),
  date: text("date").notNull(),
  roadtripFingerprint: text("roadtripFingerprint")
    .references(() => roadtripSchema.fingerprint, { onDelete: "cascade" })
    .notNull(),
});

export const eventRelations = relations(eventSchema, ({ one }) => ({
  roadtrip: one(roadtripSchema, {
    fields: [eventSchema.roadtripFingerprint],
    references: [roadtripSchema.fingerprint],
    relationName: "roadtrip",
  }),
}));
