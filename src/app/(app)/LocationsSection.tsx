import { motion, AnimatePresence, Variants } from "framer-motion";
import { Location } from "@/app/components/Location";
import { MapPinIcon } from "@/app/components/icons/MapPinIcon";
import { HotelIcon } from "@/app/components/icons/HotelIcon";
import { CalendarIcon } from "@/app/components/icons/CalendarIcon";
import { Text } from "@/app/components/ui/text";
import { useQueryClient } from "@tanstack/react-query";
import { Event, type Location as LocationType } from "@/types/evento";
import { GoToType } from "@/types/coordinate";

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

interface Props {
  onRemovePlace: (name: string) => void;
  onRemoveHotel: (name: string) => void;
  onGoToLocation: (data: GoToType) => void;
}

export function LocationsSection({
  onGoToLocation,
  onRemovePlace,
  onRemoveHotel,
}: Props) {
  const client = useQueryClient();
  const hoteles = client.getQueryData<LocationType[]>(["hoteles"]);
  const places = client.getQueryData<LocationType[]>(["places"]);
  const events = client.getQueryData<Event[]>(["eventos"]);

  return (
    <ul className="grid grid-cols-3 divide-x divide-neutral-800">
      <motion.ul variants={parentVariants} className="flex flex-col gap-2 pr-4">
        <AnimatePresence mode="popLayout">
          {places?.map((place) => (
            <Location
              key={place.name}
              location={place}
              onGoToLocation={onGoToLocation}
              onRemoveLocation={onRemovePlace}
              icon={<MapPinIcon />}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
      <motion.ul variants={parentVariants} className="flex flex-col gap-2 px-4">
        <AnimatePresence mode="popLayout">
          {hoteles?.map((place) => (
            <Location
              key={place.name}
              location={place}
              onGoToLocation={onGoToLocation}
              onRemoveLocation={onRemoveHotel}
              icon={<HotelIcon />}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
      <ul className="pl-4 flex flex-col gap-4">
        {events?.map((event) => (
          <li
            key={event.name}
            className="border border-border rounded-lg p-4 flex flex-col gap-3"
          >
            <header className="flex gap-2 items-center">
              <span className="w-fit">
                <CalendarIcon />
              </span>
              <div className="flex flex-col gap-1">
                <Text intent={"title"}>{event.name}</Text>
                <Text intent={"detail"}>{event.fecha}</Text>
              </div>
            </header>
            <Text intent={"detail"}>{event.description}</Text>
          </li>
        ))}
      </ul>
    </ul>
  );
}
