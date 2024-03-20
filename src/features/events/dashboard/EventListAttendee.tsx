import { Image, List } from "semantic-ui-react";

interface EventListAttendee {
  attendee: {
    id: string;
    name: string;
    photoURL: string;
  };
}

export default function EventListAttendee({ attendee }: EventListAttendee) {
  return (
    <List.Item>
      <Image size='mini' circular src={attendee.photoURL} />
    </List.Item>
  );
}