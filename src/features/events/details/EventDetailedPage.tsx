import { Grid } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";

export default function EventDetailedPage() {
  const { id } = useParams();
  const event = useAppSelector(state =>
    state.events.events.find(event => event.id === id));

  if (!event) return <h2>Event not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
}