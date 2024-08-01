"use server";

import { linkDataSchema } from "@/lib/zod-schema-validation/linkDataSchema";
import { RoadtripRepository } from "@/repository/roadtripRepository";
import { RoadtripService } from "@/services/roadtripService";
import { redirect } from "next/navigation";
import { ZSAError, createServerAction } from "zsa";

export const generateLink = createServerAction()
  .input(linkDataSchema)
  .handler(async ({ input }) => {
    console.log("SENDING DATA INSIDE OF SERVER ACTION");
    const roadtripService = new RoadtripService(new RoadtripRepository());
    let roadtripFingerprint;

    try {
      roadtripFingerprint = roadtripService.create(input);
    } catch (error) {
      return new ZSAError("ERROR", error);
    }

    redirect(`/roadtrip/${roadtripFingerprint}`);
  });
