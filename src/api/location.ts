import results from "./response.json";
import { Location } from "@/types/evento";

export async function getLocations(): Promise<Location[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(results.hoteles);
    }, 2000);
  });
}
