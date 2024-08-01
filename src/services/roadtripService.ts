import { LinkDataSchema } from "@/lib/zod-schema-validation/linkDataSchema";
import { RoadtripRepository } from "@/repository/roadtripRepository";
import { DrzRoadtrip } from "../../drizzle/types";

export class RoadtripService {
  constructor(private _roadtripRepository: RoadtripRepository) {}

  async create(data: LinkDataSchema) {
    const result = await this._roadtripRepository.insert(data);
    return result;
  }

  async getByFingerprint(data: DrzRoadtrip["fingerprint"]) {
    const result = await this._roadtripRepository.getOne(data);
    return result;
  }
}
