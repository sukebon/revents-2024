import EventListItem from "./EventListItem";
import { type AppEvent } from "../../../app/types/events";

interface EventListProps {
  events: AppEvent[];
}

export default function EventList({ events }: EventListProps) {
  console.log(events);
  return (
    <>
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </>
  );
}