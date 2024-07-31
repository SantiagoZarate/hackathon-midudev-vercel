import { getHoteles, getPlaces, getEvents } from "@/api/location";
import { HotelIcon, MapPinIcon } from "lucide-react";
import { Marker } from "react-map-gl";
import { useMemo } from "react";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { TQueries } from "@/types/fetchedData";
import { Coordinate } from "@/types/coordinate";
import { Location } from "@/types/evento";

interface Props {
  coordinate: Coordinate;
  onClickMarker: (data: Location) => void;
}

export function useFetchedData({ coordinate, onClickMarker }: Props) {
  const [hotelesQuery, placesQuery, eventosQuery] = useQueries<TQueries>({
    queries: [
      {
        queryKey: ["hoteles"],
        queryFn: () =>
          getHoteles({ lat: coordinate.lat!, lng: coordinate?.lng! }),
        enabled: false,
      },
      {
        queryKey: ["places"],
        queryFn: () =>
          getPlaces({ lat: coordinate?.lat!, lng: coordinate?.lng! }),
        enabled: false,
      },
      {
        queryKey: ["eventos"],
        queryFn: () =>
          getEvents({ lat: coordinate?.lat!, lng: coordinate?.lng! }),
        enabled: false,
      },
    ],
  });

  const cachedData = useQueryClient();

  const removePlace = (name: string) => {
    cachedData.setQueryData(["places"], (prevData: Location[]) => {
      return prevData.filter((p) => p.nombre !== name);
    });
  };

  const removeHotel = (name: string) => {
    cachedData.setQueryData(["hoteles"], (prevData: Location[]) => {
      return prevData.filter((p) => p.nombre !== name);
    });
  };

  const hotelPins = useMemo(
    () =>
      hotelesQuery.data?.map((hotel) => (
        <Marker
          key={`marker-${hotel.nombre}`}
          longitude={hotel.coordenadas.lng}
          latitude={hotel.coordenadas.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onClickMarker(hotel);
          }}
        >
          <HotelIcon />
        </Marker>
      )),
    [hotelesQuery.data]
  );

  const placesPins = useMemo(
    () =>
      placesQuery.data?.map((place) => (
        <Marker
          key={`marker-${place.nombre}`}
          longitude={place.coordenadas.lng}
          latitude={place.coordenadas.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onClickMarker(place);
          }}
        >
          <MapPinIcon />
        </Marker>
      )),
    [placesQuery.data]
  );

  return {
    hotelesQuery,
    placesQuery,
    eventosQuery,
    hotelPins,
    placesPins,
    removePlace,
    removeHotel,
  };
}
