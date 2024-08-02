"use client";

import { LinkIcon } from "@/app/components/icons/LinkIcon";
import { ButtonIcon } from "@/app/components/ui/button";
import { useFetchedData } from "@/app/hooks/useFetchedData";
import { useMap } from "@/app/hooks/useMap";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { type Location } from "@/types/evento";
import "mapbox-gl/dist/mapbox-gl.css";
import MapBox, { Marker, NavigationControl, Popup } from "react-map-gl";
import { useServerAction } from "zsa-react";
import { LoadingMessage } from "../components/Mapbox/LoadingMessage";
import { ArrowUpRightIcon } from "../components/icons/ArrowUpRightIcon";
import { Text } from "../components/ui/text";
import { usePins } from "../hooks/usePins";
import { ButtonsSection } from "./ButtonsSection";
import { CircleRadius } from "./CircleRadius";
import { ContinentsList } from "./ContinentsList";
import { LocationsSection } from "./LocationsSection";
import { generateLink } from "./actions";

interface Props {
  accessToken: string;
}

export function Map({ accessToken }: Props) {
  const {
    location,
    mapref,
    popupInfo,
    viewState,
    circleRadius,
    handleUpdateLocation,
    onChangeCity,
    onCreateRadius,
    setPopupInfo,
    setViewState,
    onClearMap,
    onUpdatePopupInfo,
    goTo,
  } = useMap();

  const {
    eventosQuery,
    hotelesQuery,
    placesQuery,
    removePlace,
    removeHotel,
    onClearData,
  } = useFetchedData({
    coordinate: { lat: location?.lat!, lng: location?.lng! },
  });

  const { hotelPins, placesPins, setSelectedPin } = usePins({
    hotels: hotelesQuery.data ?? [],
    places: placesQuery.data ?? [],
    onClickMarker: onUpdatePopupInfo,
  });

  const fetchResults = () => {
    onCreateRadius();
    placesQuery.refetch();
    hotelesQuery.refetch();
    eventosQuery.refetch();
  };

  const clearMap = () => {
    onClearData();
    onClearMap();
  };

  const { toast } = useToast()

  const { execute, isPending } = useServerAction(generateLink, {
    onError: () => {
      toast({
        title: "Ooops there was an error!"
      })

    },
    onSuccess: ({ data: { fingerprint } }) => {
      toast({
        title: "Link generated",
        description: (
          <section className="flex flex-col gap-2">
            <Text>Share it with your friends!</Text>
            <a
              href={`/roadtrip/${fingerprint}`}
              className="underline group/link flex gap-1 items-center"
              target="_blank"
            >
              exploremate.com/roadtrip/{fingerprint}
              <span className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition">
                <ArrowUpRightIcon />
              </span>
            </a>
          </section>
        ),
      })
    }
  });

  const handleSelectLocation = (data: Location) => {
    goTo({
      lat: data.coordinates.lat,
      lng: data.coordinates.lng,
      zoom: 16
    })
    setSelectedPin(data)
  }

  const handleGenerateLink = async () => {
    await execute({
      events: eventosQuery.data,
      hotels: hotelesQuery.data,
      places: placesQuery.data,
      coordinates: {
        lat: location?.lat!,
        lng: location?.lng!,
      },
    });
  };

  return (
    <>
      <section className="grid grid-cols-4 gap-4">
        <article className="col-span-3 flex flex-col gap-4">
          <div className="relative h-96 w-full bg-neutral-900 border border-border rounded-xl overflow-hidden">
            <LoadingMessage isLoading={placesQuery.isFetching} />
            <MapBox
              ref={mapref}
              {...viewState}
              onMove={(e) => setViewState(e.viewState)}
              mapboxAccessToken={accessToken}
              dragRotate={false}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              onClick={(e) => {
                handleUpdateLocation(e);
              }}
            >
              {circleRadius && <CircleRadius data={circleRadius} />}
              {location && (
                <Marker
                  longitude={location.lng}
                  latitude={location.lat}
                  color="red"
                  draggable
                />
              )}
              {placesPins}
              {hotelPins}
              {popupInfo && (
                <Popup
                  anchor="top"
                  longitude={popupInfo.coordinates.lng}
                  latitude={popupInfo.coordinates.lat}
                  onClose={() => setPopupInfo(null)}
                  className="flex flex-col gap-2 text-neutral-900"
                >
                  <p className="font-bold">{popupInfo.name}</p>
                  <p className="text-xs">{popupInfo.description}</p>
                </Popup>
              )}
              <NavigationControl />
            </MapBox>
          </div>
          <ButtonsSection
            onFetchResults={fetchResults}
            onClearMap={clearMap}
            isPending={location === null || placesQuery.isFetching}
          />
          <LocationsSection
            onGoToLocation={handleSelectLocation}
            onRemoveHotel={removeHotel}
            onRemovePlace={removePlace}
          />
          {placesQuery.data && (
            <section>
              <ButtonIcon
                disabled={isPending}
                onClick={() => handleGenerateLink()}
                icon={<LinkIcon />}
              >
                Generate Link
              </ButtonIcon>
            </section>
          )}
        </article>
        <ContinentsList onChangeCity={onChangeCity} />
      </section>
      <Toaster />
    </>
  );
}
