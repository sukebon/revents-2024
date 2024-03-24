import { ChangeEvent, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { createEvent, updateEvent } from './eventSlice';
import { createId } from '@paralleldrive/cuid2';

export default function EventForm() {
  const { id } = useParams();
  const event = useAppSelector(state =>
    state.events.events.find(event => event.id === id));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initValues = event ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const [values, setValues] = useState(initValues);

  function onSubmit() {
    const linkId: string | undefined | void = id ?? createId();
    event
      ? dispatch(updateEvent({ ...event, ...values }))
      : dispatch(createEvent({
        ...values, id: linkId, hostedBy: 'bog', attendees: [], hostPhotoURL: '/categoryImages/music.jpg'
      }));
    navigate(`/events/${linkId}`);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }

  return (
    <Segment clearing>
      <Header content={event ? 'Update event' : 'Create Event'} />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder='Event title'
            name="title"
            value={values.title}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder='Category'
            name="category"
            value={values.category}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder='Description'
            name="description"
            value={values.description}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input type="text"
            placeholder='City'
            name="city"
            value={values.city}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder='Venue'
            name="venue"
            value={values.venue}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder='Date'
            name="date"
            value={values.date}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Button type='submit' floated='right' positive content='Submit' />
        <Button
          as={Link}
          to='/events'
          type='button'
          floated='right'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
}
