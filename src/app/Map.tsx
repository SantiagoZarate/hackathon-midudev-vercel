"use client";

import { LinkIcon } from "@/components/icons/LinkIcon";
import { ButtonIcon } from "@/components/ui/button";
import { useFetchedData } from "@/hooks/useFetchedData";
import { useMap } from "@/hooks/useMap";
import "mapbox-gl/dist/mapbox-gl.css";
import MapBox, { Marker, NavigationControl, Popup } from "react-map-gl";
import { useServerAction } from "zsa-react";
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
    hotelPins,
    hotelesQuery,
    placesPins,
    placesQuery,
    removePlace,
    removeHotel,
    onClearData,
  } = useFetchedData({
    coordinate: { lat: location?.lat!, lng: location?.lng! },
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

  const { execute } = useServerAction(generateLink, {
    onError: ({ err }) => {
      console.log(err.message);
    },
  });

  const handleGenerateLink = async () => {
    await execute({
      events: eventosQuery.data ?? [],
      hotels: hotelesQuery.data ?? [],
      places: placesQuery.data ?? [],
    });
  };

  return (
    <section className="grid grid-cols-4 gap-4">
      <article className="col-span-3 flex flex-col gap-4">
        <div className="relative h-96 w-full bg-neutral-900 border border-border rounded-xl overflow-hidden">
          {placesQuery.isLoading && (
            <div className="absolute inset-0 bg-black/70 animate-pulse z-50" />
          )}
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
          isPending={location === null || placesQuery.isLoading}
        />
        <LocationsSection
          onGoToLocation={goTo}
          onRemoveHotel={removeHotel}
          onRemovePlace={removePlace}
        />
        <section>
          <ButtonIcon onClick={() => handleGenerateLink()} icon={<LinkIcon />}>
            Generate Link
          </ButtonIcon>
        </section>
      </article>
      <ContinentsList onChangeCity={onChangeCity} />
    </section>
  );
}
