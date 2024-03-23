import EventListItem from "./EventListItem";
import { type AppEvent } from "../../../app/types/events";

interface EventListProps {
  events: AppEvent[];
}

export default function EventList({ events }: EventListProps) {

  return (
    <>
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </>
  );
}