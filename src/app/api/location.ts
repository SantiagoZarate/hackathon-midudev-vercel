import { Coordinate } from "@/types/coordinate";
import bsas from "./buenos-aires.json";
import { Event, Location } from "@/types/evento";

export async function getHoteles(data: Coordinate): Promise<Location[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(bsas.hoteles);
    }, 2000);
  });
}

export async function getPlaces(data: Coordinate): Promise<Location[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(bsas.zonas_de_interes);
    }, 2000);
  });
}

export async function getEvents(data: Coordinate): Promise<Event[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(bsas.eventos);
    }, 2000);
  });
}
