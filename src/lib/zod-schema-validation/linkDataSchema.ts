import { z } from "zod";

const baseLocation = z.object({
  name: z.string(),
  description: z.string(),
});

const location = baseLocation.extend({
  aproximate_distance_in_km: z.coerce.number(),
  exact_location: z.string(),
  coordinates: z.object({
    lat: z.coerce.number(),
    lng: z.coerce.number(),
  }),
});

const event = baseLocation.extend({
  fecha: z.string(),
});

export const linkDataSchema = z.object({
  places: location.array().optional(),
  hotels: location.array().optional(),
  events: event.array().optional(),
  coordinates: z.object({
    lat: z.coerce.number(),
    lng: z.coerce.number(),
  }),
});

export type LinkDataSchema = z.infer<typeof linkDataSchema>;
