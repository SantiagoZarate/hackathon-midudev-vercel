import { CountryButton } from "@/app/components/CountryButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { getContinentIcon } from "@/lib/getContinentIcon";
import { Coordinate } from "@/types/coordinate";
import { Continents } from "@/types/evento";
import continents from "../api/continents.json";

interface Props {
  onChangeCity: (data: Coordinate) => void;
}

export function ContinentsList({ onChangeCity }: Props) {
  return (
    <Accordion
      type="single"
      defaultValue="item-0"
      collapsible
      className="w-full"
    >
      {continents.map((continent, index) => (
        <AccordionItem key={continent.name} value={`item-${index}`}>
          <AccordionTrigger className="capitalize">
            <div className="flex gap-2 items-center">
              {getContinentIcon(continent.name as Continents)}
              {continent.name}
            </div>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2">
            {continent.countries.map((country) => (
              <CountryButton
                key={country.pais}
                country={country}
                onChangeCity={onChangeCity}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
