"use server";

import { linkDataSchema, outputGenerateLink } from "@/lib/zod-schema-validation/linkDataSchema";
import { RoadtripRepository } from "@/repository/roadtripRepository";
import { RoadtripService } from "@/services/roadtripService";
import { ZSAError, createServerAction } from "zsa";

export const generateLink = createServerAction()
  .input(linkDataSchema)
  .handler(async ({ input }) => {
    await new Promise((resolve) => setTimeout(() => { resolve({}) }, 3000))

    return {
      fingerprint: "fingerrrr"
    }

    console.log("SENDING DATA INSIDE OF SERVER ACTION");
    const roadtripService = new RoadtripService(new RoadtripRepository());
    let fingerprint;
    try {
      fingerprint = roadtripService.create(input);
    } catch (error) {
      // return new ZSAError("ERROR", error);
    }

    return {
      fingerprint
    }
  });
