import { Grid } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";

export default function EventDetailedPage() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader />
        <EventDetailedInfo />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
}