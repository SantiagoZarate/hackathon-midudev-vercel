import { Marker } from "react-map-gl";
import { useMemo, useState } from "react";
import { HotelFillIcon } from "../components/icons/HotelFillIcon";
import { HotelIcon } from "../components/icons/HotelIcon";
import { Location } from "@/types/evento";
import { MapPinIcon } from "../components/icons/MapPinIcon";
import { MapPinFillIcon } from "../components/icons/MapPinFillIcon";

interface Props {
  places: Location[],
  hotels: Location[],
  onClickMarker: (data: Location) => void;
}

export function usePins({ hotels, places, onClickMarker }: Props) {
  const [selectedPin, setSelectedPin] = useState<Location>()

  const hotelPins = useMemo(
    () =>
      hotels.map((hotel) => (
        <Marker
          key={`marker-${hotel.name}`}
          longitude={hotel.coordinates.lng}
          latitude={hotel.coordinates.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedPin(hotel)
            onClickMarker(hotel);
          }}
        >
          {
            selectedPin === hotel
              ? <HotelFillIcon />
              : <HotelIcon />
          }

        </Marker>
      )),
    [hotels, selectedPin]
  );

  const placesPins = useMemo(
    () =>
      places.map((place) => (
        <Marker
          key={`marker-${place.name}`}
          longitude={place.coordinates.lng}
          latitude={place.coordinates.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedPin(place)
            onClickMarker(place);
          }}
        >
          {
            selectedPin === place
              ? <MapPinFillIcon />
              : <MapPinIcon />
          }

        </Marker>
      )),
    [places, selectedPin]
  );

  return {
    hotelPins,
    placesPins,
    selectedPin,
    setSelectedPin
  }
}