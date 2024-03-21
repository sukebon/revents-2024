import EventListItem from "./EventListItem";
import { type AppEvent } from "../../../app/types/events";

interface EventListProps {
  events: AppEvent[];
  selectEvent: (event: AppEvent) => void;
  deleteEvent: (eventId: string) => void;
}

export default function EventList({ events, selectEvent, deleteEvent }: EventListProps) {
  console.log(events);
  return (
    <>
      {events.map((event) => (
        <EventListItem key={event.id} event={event}
          selectedEvent={selectEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </>
  );
}