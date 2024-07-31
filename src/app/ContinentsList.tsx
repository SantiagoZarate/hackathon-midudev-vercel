import continents from "../api/continents.json";
import { CountryButton } from "@/components/CountryButton";
import { Coordinate } from "@/types/coordinate";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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
        <AccordionItem value={`item-${index}`}>
          <AccordionTrigger className="capitalize">
            {continent.name}
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2">
            {continent.countries.map((country) => (
              <CountryButton country={country} onChangeCity={onChangeCity} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
