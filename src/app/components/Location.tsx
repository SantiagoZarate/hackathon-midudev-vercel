import React from "react";
import { GoToType } from "@/types/coordinate";
import { type Location as LocationType } from "@/types/evento";
import { ClipboardIcon } from "./icons/ClipboardIcon";
import { MarkIcon } from "./icons/MarkIcon";
import { CountryWrapper } from "./motion/CountryWrapper";

interface Props {
  location: LocationType;
  onRemoveLocation: (name: string) => void;
  onGoToLocation: (data: GoToType) => void;
  icon: JSX.Element;
}

export function Location({
  location,
  onRemoveLocation,
  onGoToLocation,
  icon,
}: Props) {
  return (
    <CountryWrapper
      onClick={() =>
        onGoToLocation({
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
          zoom: 16,
        })
      }
    >
      <span className="w-fit">{icon}</span>
      <div className="flex flex-col gap-1">
        <header className="flex items-center gap-2">
          <p className="font-bold text-sm capitalize truncate max-w-[200px]">
            {location.name}
          </p>
          <p className="text-xs text-green-400">
            {location.aproximate_distance_in_km} KM
          </p>
        </header>
        <p className="text-xs text-start  truncate max-w-[300px]">
          {location.exact_location}
        </p>
      </div>
      <div className="flex-col absolute inset-0 z-10 right-0 flex items-end gap p-1 group-hover:opacity-100 opacity-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemoveLocation(location.name);
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
