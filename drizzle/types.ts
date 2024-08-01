import { eventSchema } from "./schemas/event";
import { locationSchema } from "./schemas/location";
import { roadtripSchema } from "./schemas/roadtrip";

export type DrzLocation = typeof locationSchema.$inferInsert;
export type DrzEvent = typeof eventSchema.$inferInsert;
export type DrzRoadtrip = typeof roadtripSchema.$inferInsert;
