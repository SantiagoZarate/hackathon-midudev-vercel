"use client";

import { HotelIcon } from "@/components/icons/HotelIcon";
import { MapPinIcon } from "@/components/icons/MapPinIcon";
import { APIResponse, Location } from "@/types/evento";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo, useState } from "react";
import MapBox, {
  Layer,
  MapMouseEvent,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from "react-map-gl";

interface Props {
  accessToken: string;
  locations: APIResponse;
}

const latCenter = -34.472495652359854;
const lngCenter = -58.68465843536305;

export function Map({ accessToken, locations }: Props) {
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);
  const [viewState, setViewState] = useState({
    latitude: latCenter,
    longitude: lngCenter,
    zoom: 11,
  });

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const [circleRadius, setCircleRadius] = useState<{
    circle: any;
    line: any;
  } | null>(null);

  const onCreateRadius = () => {
    if (!location) return;

    const radius = 5;
    const center = [location.lng, location.lat];
    const options = {
      steps: 80,
      units: undefined,
      properties: { foo: "bar" },
    };

    var circle = turf.circle(center, radius, options);

    setCircleRadius({
      circle,
      line: turf.lineString(circle.geometry.coordinates.flat()),
    });
  };

  const handleUpdateLocation = (event: MapMouseEvent) => {
    const {
      lngLat: { lat, lng },
    } = event;
    setLocation({ lat, lng });
  };

  const hotelPins = useMemo(
    () =>
      locations.hoteles.map((hotel) => (
        <Marker
          key={`marker-${hotel.nombre}`}
          longitude={hotel.coordenadas.lng}
          latitude={hotel.coordenadas.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(hotel);
          }}
        >
          <HotelIcon />
        </Marker>
      )),
    []
  );

  const zonePins = useMemo(
    () =>
      locations.zonas_de_interes.map((zona) => (
        <Marker
          key={`marker-${zona.nombre}`}
          longitude={zona.coordenadas.lng}
          latitude={zona.coordenadas.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(zona);
          }}
        >
          <MapPinIcon />
        </Marker>
      )),
    []
  );

  return (
    <>
      <div className="h-96 w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <MapBox
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
          {circleRadius && (
            <>
              <Source id="my-data" type="geojson" data={circleRadius.circle!}>
                <Layer
                  id="point-90-hi"
                  type="fill"
                  paint={{
                    "fill-color": "hsla(0deg,0%,0%,0.4)",
                    "fill-outline-color": "yellow",
                  }}
                />
              </Source>
              <Source id="my-ata" type="geojson" data={circleRadius.line}>
                <Layer
                  id="point-9-hi"
                  type="line"
                  paint={{
                    "line-color": "hsl(0deg,0%,80%)",
                    "line-width": 2,
                  }}
                />
              </Source>
            </>
          )}
          {location && (
            <Marker
              longitude={location.lng}
              latitude={location.lat}
              color="red"
              draggable
            />
          )}
          {zonePins}
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
      <button
        className="border border-neutral-800 rounded-lg py-2"
        onClick={() => {}}
      >
        click
      </button>
      <button
        className="border border-neutral-800 rounded-lg py-2 disabled:opacity-50"
        onClick={() => onCreateRadius()}
        disabled={location === null}
      >
        Generate circle radius
      </button>
      {location && <p>{JSON.stringify(location, null, 2)}</p>}
    </>
  );
}
