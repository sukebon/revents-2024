import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../form/EventForm";
import { sampleData } from '../../../app/api/sampleData';
import { useEffect, useState } from "react";
import { AppEvent } from "../../../app/types/events";

interface EventDashboardProps {
  formOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectEvent: (event: AppEvent | null) => void;
  selectedEvent: AppEvent | null;
}

export default function EventDashboard({ formOpen, setFormOpen, selectEvent, selectedEvent }: EventDashboardProps) {
  const [events, setEvents] = useState<AppEvent[]>([]);


  useEffect(() => {
    setEvents(sampleData);
  }, []);

  function addEvent(event: AppEvent) {
    setEvents(prevState => [...prevState, event]);
  }

  function updateEvent(updatedEvent: AppEvent) {
    setEvents(events.map((event) => event.id === updatedEvent.id ? updatedEvent : event));
    selectEvent(null);
    setFormOpen(false);
  }

  function deleteEvent(eventId: string) {
    setEvents(events.filter((event) => event.id !== eventId));

  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            updateEvent={updateEvent}
            addEvent={addEvent}
            selectedEvent={selectedEvent}
            key={selectedEvent ? selectedEvent.id : "create"}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}