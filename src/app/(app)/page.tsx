import { MapIcon } from "@/app/components/icons/MapIcon";
import { Map } from "../components/Mapbox/Map";
import { QueryProvider } from "./QueryProvider";

export default async function Page() {
  return (
    <>
      <header className="flex flex-col gap-1">
        <h1 className="text-lg font-bold">ExploreMate</h1>
        <p className="text-sm">Let AI Be Your Guide to Amazing Destinations</p>
      </header>
      <section className="flex flex-col gap-2">
        <header className="flex divide-x *:px-2 [&>:first-child]:pl-0 items-center">
          <span>
            <MapIcon />
          </span>
          <p>Choose your next destination</p>
        </header>
        <QueryProvider>
          <Map accessToken={process.env.MAPBOX_ACCESS_TOKEN!} />
        </QueryProvider>
      </section>
    </>
  );
}
