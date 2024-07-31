import { AfricaIcon } from "@/components/icons/AfricaIcon";
import { AmericaIcon } from "@/components/icons/AmericaIcon";
import { AsiaIcon } from "@/components/icons/AsiaIcon";
import { EuropeIcon } from "@/components/icons/EuropeIcon";
import { Continents } from "@/types/evento";

export function getContinentIcon(name: Continents) {
  switch (name) {
    case "america":
      return <AmericaIcon />;
    case "africa":
      return <AfricaIcon />;
    case "europe":
      return <EuropeIcon />;
    case "asia":
      return <AsiaIcon />;
  }
}
