import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const roadtripSchema = sqliteTable("roadtrip", {
  fingerprint: text("fingerprint")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  lat: integer("lat").notNull(),
  lng: integer("lng").notNull(),
});

// export const roadtripRelations = relations(roadtripSchema, ({ many }) => ({
//   locations: many(locationSchema),
//   events: many(eventSchema),
// }));
