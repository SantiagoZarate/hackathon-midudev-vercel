import { GoToType } from "@/types/coordinate";
import { type Location } from "@/types/evento";
import { MarkIcon } from "./icons/MarkIcon";
import { CountryWrapper } from "./motion/CountryWrapper";
import { MapPinIcon } from "./icons/MapPinIcon";
import { ClipboardIcon } from "./icons/ClipboardIcon";

interface Props {
  location: Location;
  onRemoveLocation: (name: string) => void;
  onGoToLocation: (data: GoToType) => void;
}

export function Location({
  location,
  onRemoveLocation,
  onGoToLocation,
}: Props) {
  return (
    <CountryWrapper
      onClick={() =>
        onGoToLocation({
          lat: location.coordenadas.lat,
          lng: location.coordenadas.lng,
          zoom: 16,
        })
      }
    >
      <MapPinIcon />
      <div className="flex flex-col gap-1">
        <header className="flex items-center gap-2">
          <p className="font-bold text-sm capitalize truncate max-w-[200px]">
            {location.nombre}
          </p>
          <p className="text-xs text-green-400">
            {location.distancia_aproximada_en_km} KM
          </p>
        </header>
        <p className="text-xs text-start">{location.ubicacion_exacta}</p>
      </div>
      <div className="flex-col absolute inset-0 z-10 right-0 flex items-end gap p-1 group-hover:opacity-100 opacity-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemoveLocation(location.nombre);
          }}
          className="bg-neutral-800 rounded-md h-fit p-1"
        >
          <MarkIcon />
        </button>
        <button className="bg-neutral-800 rounded-md h-fit p-1">
          <ClipboardIcon />
        </button>
      </div>
    </CountryWrapper>
  );
}
