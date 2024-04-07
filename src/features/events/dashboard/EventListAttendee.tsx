import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";

interface EventListAttendee {
  attendee: {
    id: string;
    displayName: string;
    photoURL: string;
  };
}

export default function EventListAttendee({ attendee }: EventListAttendee) {
  return (
    <List.Item as={Link} to={`/profiles/${attendee.id}`}>
      <Image size='mini' circular src={attendee.photoURL} />
    </List.Item>
  );
}