"use server";

import { linkDataSchema } from "@/lib/zod-schema-validation/linkDataSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZSAError, createServerAction } from "zsa";

export const generateLink = createServerAction()
  .input(linkDataSchema)
  .handler(async ({ input }) => {
    console.log("SENDING DATA INSIDE OF SERVER ACTION");
    console.log(input);
    try {
    } catch (error) {
      return new ZSAError("ERROR", error);
    }

    return "SERVER ACTION EXECUTED";
    // revalidatePath("/");
    // redirect("/");
  });
