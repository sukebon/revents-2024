import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../form/EventForm";
import { sampleData } from '../../../app/api/sampleData';
import { useEffect, useState } from "react";
import { AppEvent } from "../../../app/types/events";

interface EventDashboardProps {
  formOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EventDashboard({ formOpen, setFormOpen }: EventDashboardProps) {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setEvents(sampleData);
  }, []);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm setFormOpen={setFormOpen} />
        )}
      </Grid.Column>
    </Grid>
  );
}