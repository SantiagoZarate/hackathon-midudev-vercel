import { getEvents, getHoteles, getPlaces } from "@/app/api/location";
import { Coordinate } from "@/types/coordinate";
import { Location } from "@/types/evento";
import { TQueries } from "@/types/fetchedData";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { HotelIcon, MapPinIcon } from "lucide-react";
import { useMemo } from "react";
import { Marker } from "react-map-gl";
import { HotelFillIcon } from "../components/icons/HotelFillIcon";

interface Props {
  coordinate: Coordinate;
}

export function useFetchedData({ coordinate }: Props) {
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
      return prevData.filter((p) => p.name !== name);
    });
  };

  const removeHotel = (name: string) => {
    cachedData.setQueryData(["hoteles"], (prevData: Location[]) => {
      return prevData.filter((p) => p.name !== name);
    });
  };

  const onClearData = () => {
    cachedData.clear();
  };

  console.log(hotelesQuery.data)



  return {
    hotelesQuery,
    placesQuery,
    eventosQuery,
    removePlace,
    removeHotel,
    onClearData,
  };
}
