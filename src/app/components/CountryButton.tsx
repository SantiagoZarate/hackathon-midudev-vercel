import { RightArrowMicroIcon } from "./icons/RightArrowMicroIcon";
import { type Coordinate } from "../../types/coordinate";
import { Country, Location } from "@/types/evento";

interface Props {
  onChangeCity: (data: Coordinate) => void;
  country: Country;
}

export function CountryButton({ onChangeCity, country }: Props) {
  return (
    <button
      onClick={() =>
        onChangeCity({
          lat: country.lat,
          lng: country.lng,
        })
      }
      className="group relative rounded-lg h-10 overflow-hidden border border-border"
    >
      <div className="absolute z-10 inset-0 bg-gradient-to-r from-neutral-950 to-transparent flex gap-1 items-center px-4">
        {country.pais}
        <span className="group-hover:opacity-100 group-hover:translate-x-0 transition opacity-0 -translate-x-2">
          <RightArrowMicroIcon />
        </span>
      </div>
      <img
        className="group-hover:scale-[103%] duration-300 transition object-cover w-full h-full saturate-0"
        src={`./images/${country.imagen}`}
        alt=""
      />
      {/* <span className="">🇦🇷 {country.pais}</span> */}
    </button>
  );
}
