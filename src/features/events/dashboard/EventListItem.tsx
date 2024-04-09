import { Button, Icon, Item, ItemGroup, Label, List, Segment, SegmentGroup } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../app/types/events";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { format } from "date-fns";

interface EventListItemProps {
  event: AppEvent;
}
export default function EventListItem({ event }: EventListItemProps) {
  const { remove } = useFireStore('events');
  const { status } = useAppSelector(state => state.events);

  if (status === 'loading') return <LoadingComponent />;

  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size='tiny' circular src={event.hostPhotoURL || '/user.png'} />
            <Item.Content>
              <Item.Header>{event.title}</Item.Header>
              <Item.Description>
                Hosted by {event.hostedBy}
              </Item.Description>
              {event.isCancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon='right'
                  color='red'
                  content='This event has been cancelled'
                />
              )}
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' />{format(event.date, 'yyyy-MM-dd h-mm a')}
          <Icon name="marker" />{event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{event.description}</span>
        <Button
          onClick={() => remove(event.id)}
          color='red'
          floated="right"
          content='Delete'
        />
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </SegmentGroup>
  );
}