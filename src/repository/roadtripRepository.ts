import { LinkDataSchema } from "@/lib/zod-schema-validation/linkDataSchema";
import { sql } from "drizzle-orm";
import { db } from "../../drizzle";
import { eventSchema } from "../../drizzle/schemas/event";
import { locationSchema } from "../../drizzle/schemas/location";
import { roadtripSchema } from "../../drizzle/schemas/roadtrip";
import { DrzRoadtrip } from "../../drizzle/types";

export class RoadtripRepository {
  private _db: typeof db;

  constructor() {
    this._db = db;
  }

  async insert(data: LinkDataSchema): Promise<DrzRoadtrip["fingerprint"]> {
    return await this._db.transaction(async (tx) => {
      // Insert new roadtrip
      const [{ fingerprint }] = await tx
        .insert(roadtripSchema)
        .values({
          lat: data.coordinates.lat,
          lng: data.coordinates.lng,
        })
        .returning({ fingerprint: roadtripSchema.fingerprint });

      // Insert events
      data.events?.forEach(async (event) => {
        await tx.insert(eventSchema).values({
          roadtripFingerprint: fingerprint,
          description: event.description,
          date: event.fecha,
          name: event.name,
        });
      });

      // Insert hotels
      data.hotels?.forEach(async (hotel) => {
        await tx.insert(locationSchema).values({
          aproximate_distance_in_km: hotel.aproximate_distance_in_km,
          exact_location: hotel.exact_location,
          roadtripFingerprint: fingerprint,
          description: hotel.description,
          lat: hotel.coordinates.lat,
          lng: hotel.coordinates.lng,
          name: hotel.name,
          type: "hotel",
        });
      });

      // Insert places
      data.hotels?.forEach(async (hotel) => {
        await tx.insert(locationSchema).values({
          aproximate_distance_in_km: hotel.aproximate_distance_in_km,
          exact_location: hotel.exact_location,
          roadtripFingerprint: fingerprint,
          description: hotel.description,
          lat: hotel.coordinates.lat,
          lng: hotel.coordinates.lng,
          name: hotel.name,
          type: "place",
        });
      });

      return fingerprint;
    });
  }

  async getOne(id: DrzRoadtrip["fingerprint"]): Promise<DrzRoadtrip> {
    const [result] = await this._db
      .select()
      .from(roadtripSchema)
      .where(sql`${roadtripSchema.fingerprint} = ${id}`);

    if (!result) {
      throw new Error(`Roadtrip with fingerprint ${id} not found.`);
    }

    return result;
  }
}
