import { RoadtripRepository } from "@/repository/roadtripRepository";
import { RoadtripService } from "@/services/roadtripService";

interface Params {
  params: {
    fingerprint: string;
  };
}

export default async function page({ params: { fingerprint } }: Params) {
  const roadtripService = new RoadtripService(new RoadtripRepository());
  const roadtrip = await roadtripService.getByFingerprint(fingerprint);

  return (
    <section className="flex flex-col gap-4">
      <h1>Roadtrip page {roadtrip.fingerprint}</h1>
      <p>{roadtrip.lat}</p>
      <p>{roadtrip.lng}</p>
    </section>
  );
}
