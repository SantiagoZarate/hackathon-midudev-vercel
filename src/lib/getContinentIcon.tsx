import { AfricaIcon } from "@/app/components/icons/AfricaIcon";
import { AmericaIcon } from "@/app/components/icons/AmericaIcon";
import { AsiaIcon } from "@/app/components/icons/AsiaIcon";
import { EuropeIcon } from "@/app/components/icons/EuropeIcon";
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
