"use client";

import { CountryButton } from "@/components/CountryButton";
import { Location } from "@/components/Location";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMap } from "@/hooks/useMap";
import { AnimatePresence, Variants, motion } from "framer-motion";
import "mapbox-gl/dist/mapbox-gl.css";
import MapBox, { Marker, NavigationControl, Popup } from "react-map-gl";
import continents from "../api/continents.json";
import { CircleRadius } from "./CircleRadius";
import { HotelIcon } from "@/components/icons/HotelIcon";
import { MapPinIcon } from "@/components/icons/MapPinIcon";
import { Text } from "@/components/ui/text";
import { CalendarIcon } from "@/components/icons/CalendarIcon";

interface Props {
  accessToken: string;
  // locations: APIResponse;
}

const parentVariants: Variants = {
  visible: {
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};

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
    placesPins,
    events,
    isPending,
    hoteles,
    places,
    removePlace,
    goTo,
  } = useMap();

  return (
    <section className="grid grid-cols-4 gap-4">
      <article className="col-span-3 flex flex-col gap-4">
        <div className="relative h-96 w-full bg-neutral-900 border border-border rounded-xl overflow-hidden">
          {isPending && (
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
        <div className="flex gap-2">
          <button
            className="border w-full border-border rounded-lg py-2 disabled:opacity-50"
            onClick={() => onCreateRadius()}
            disabled={location === null || isPending}
          >
            Generate circle radius
          </button>
          <button
            className="border w-full border-border rounded-lg py-2"
            onClick={onClearMap}
          >
            clear
          </button>
        </div>
        <ul className="grid grid-cols-3 divide-x divide-neutral-800">
          <motion.ul
            variants={parentVariants}
            className="flex flex-col gap-2 pr-4"
          >
            <AnimatePresence mode="popLayout">
              {places.map((place) => (
                <Location
                  key={place.nombre}
                  location={place}
                  onGoToLocation={goTo}
                  onRemoveLocation={removePlace}
                  icon={<MapPinIcon />}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
          <motion.ul
            variants={parentVariants}
            className="flex flex-col gap-2 px-4"
          >
            <AnimatePresence mode="popLayout">
              {hoteles.map((place) => (
                <Location
                  key={place.nombre}
                  location={place}
                  onGoToLocation={goTo}
                  onRemoveLocation={removePlace}
                  icon={<HotelIcon />}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
          <ul className="pl-4 flex flex-col gap-4">
            {events.map((event) => (
              <li
                key={event.nombre}
                className="border border-border rounded-lg p-4 flex flex-col gap-3"
              >
                <header className="flex gap-2 items-center">
                  <span className="w-fit">
                    <CalendarIcon />
                  </span>
                  <div className="flex flex-col gap-1">
                    <Text intent={"title"}>{event.nombre}</Text>
                    <Text intent={"detail"}>{event.fecha}</Text>
                  </div>
                </header>
                <Text intent={"detail"}>{event.descripcion}</Text>
              </li>
            ))}
          </ul>
        </ul>
      </article>
      <Accordion
        type="single"
        defaultValue="item-0"
        collapsible
        className="w-full"
      >
        {continents.map((continent, index) => (
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="capitalize">
              {continent.name}
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-2">
              {continent.countries.map((country) => (
                <CountryButton country={country} onChangeCity={onChangeCity} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
