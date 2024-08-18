"use server";

import { linkDataSchema, outputGenerateLink } from "@/lib/zod-schema-validation/linkDataSchema";
import { RoadtripRepository } from "@/repository/roadtripRepository";
import { RoadtripService } from "@/services/roadtripService";
import { ZSAError, createServerAction } from "zsa";
import { z } from 'zod'
import OpenAI from 'openai'
import { streamText } from 'ai'
import { OpenAIProvider } from '@ai-sdk/openai'
import { Location } from "@/types/evento";
import { json } from "stream/consumers";

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

const perpexity = new OpenAI({
  apiKey: process.env.PPXT_KEY || "",
  baseURL: "https://api.perplexity.ai/"
})

export const generateData = createServerAction()
  .input(z.object({
    lat: z.coerce.number(),
    lng: z.coerce.number()
  }))
  .handler(async ({ input: { lat, lng } }) => {
    const prompt = `Dame sugerencias de hoteles para hospedarme dentro de un radio de 10 kilometros de la siguiente ubicacion representada en latitud y longitud:
  
    latitud: ${lat}
    longitud: ${lng}
  
    Quiero que cumplas a raja tabla la consigna de los 10 kilometros, si no hay nada dentro de ese radio hazmelo saber pero dime, si te atreves a viajar mas de 10 kilometros te recomiendo visitar estos lugares, y ahi si listar lugares que sobrepasen la distancia, la ubicacion en coordenadas debe ser lo mas exacta posible.
  
    El output debe ser en formato JSON, con la siguiente estructura:
  
    [
      {
        name: string,
        description: string,
        aproximate_distance_in_km: number,
        exact_location: string,
        coordinates: {
            lat: number,
            lng: number
        }
      }
    ]
  
    Quiero ver resultados, no me entregues un array vacio, solo devuelve el json, nada de texto explicando que es lo que estas devolviendo.`

    const query = {
      model: "llama-3.1-sonar-small-128k-chat",
      max_tokens: 1000,
      frequency_penalty: 1,
      messages: buildPrompt(prompt),
    } satisfies OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming

    let response;
    try {
      response = await perpexity.chat.completions.create(query)
      const message = response.choices[0].message.content!
      const messageToList = message.split("")
      const json = messageToList.slice(7, messageToList.length - 3).join("")
      console.log(json)
      const parsedJson: Location[] = JSON.parse(json)
      console.log(parsedJson)
      return parsedJson
    } catch (error) {
      throw new ZSAError("ERROR", error)
    }
  });

function buildPrompt(prompt: string): [{ role: "user", content: string }] {
  return [
    {
      role: "user",
      content: prompt
    }
  ]
}