"use client";

import { useMap } from "@/hooks/useMap";
import "mapbox-gl/dist/mapbox-gl.css";
import MapBox, { Marker, NavigationControl, Popup } from "react-map-gl";
import cities from "../api/cities.json";
import { CircleRadius } from "./CircleRadius";

interface Props {
  accessToken: string;
  // locations: APIResponse;
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
    hotelPins,
    onClearMap,
  } = useMap();

  // const zonePins = useMemo(
  //   () =>
  //     locations.zonas_de_interes.map((zona) => (
  //       <Marker
  //         key={`marker-${zona.nombre}`}
  //         longitude={zona.coordenadas.lng}
  //         latitude={zona.coordenadas.lat}
  //         anchor="bottom"
  //         onClick={(e) => {
  //           e.originalEvent.stopPropagation();
  //           setPopupInfo(zona);
  //         }}
  //       >
  //         <MapPinIcon />
  //       </Marker>
  //     )),
  //   []
  // );

  return (
    <>
      <div className="h-96 w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <MapBox
          ref={mapref}
          {...viewState}
          onMove={(e) => setViewState(e.viewState)}
          mapboxAccessToken={accessToken}
          dragRotate={false}
          scrollZoom={true}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          renderWorldCopies={false}
          interactive={true}
          style={{ height: "100%", width: "100%" }}
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
          {/* {zonePins} */}
          {hotelPins}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={popupInfo.coordenadas.lng}
              latitude={popupInfo.coordenadas.lat}
              onClose={() => setPopupInfo(null)}
              className="flex flex-col gap-2 text-neutral-900"
            >
              <p className="font-bold">{popupInfo.nombre}</p>
              <p className="text-xs">{popupInfo.descripcion}</p>
            </Popup>
          )}
          <NavigationControl />
        </MapBox>
      </div>
      <section className="grid grid-cols-4 gap-1">
        {cities.map((city) => (
          <button
            key={city.ciudad}
            className="border border-neutral-800 rounded-lg text-xs py-1 hover:bg-neutral-800"
            onClick={() =>
              onChangeCity({ lat: city.latitud, lng: city.longitud })
            }
          >
            {city.ciudad}
          </button>
        ))}
      </section>
      <button
        className="border border-neutral-800 rounded-lg py-2 disabled:opacity-50"
        onClick={() => onCreateRadius()}
        disabled={location === null}
      >
        Generate circle radius
      </button>
      <button
        className="border border-neutral-800 rounded-lg py-2"
        onClick={onClearMap}
      >
        clear
      </button>
    </>
  );
}
