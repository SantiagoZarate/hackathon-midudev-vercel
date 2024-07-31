import { UseQueryOptions } from "@tanstack/react-query";
import { Location, Event } from "./evento";

export type TQueries = [
  UseQueryOptions<Location[], Error>,
  UseQueryOptions<Location[], Error>,
  UseQueryOptions<Event[], Error>
];
