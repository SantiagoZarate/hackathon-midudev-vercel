import bsas from "./buenos-aires.json";
import { Event, Location } from "@/types/evento";

export async function getHoteles(): Promise<Location[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(bsas.hoteles);
    }, 2000);
  });
}

export async function getPlaces(): Promise<Location[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(bsas.zonas_de_interes);
    }, 2000);
  });
}

export async function getEvents(): Promise<Event[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(bsas.eventos);
    }, 2000);
  });
}
