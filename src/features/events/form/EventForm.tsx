import { ChangeEvent, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { AppEvent } from '../../../app/types/events';
import { createId } from '@paralleldrive/cuid2';

interface EventFormProps {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addEvent: (event: AppEvent) => void;
  updateEvent: (event: AppEvent) => void;
  selectedEvent: AppEvent | null;
}
export default function EventForm({ setFormOpen, addEvent, updateEvent, selectedEvent }: EventFormProps) {

  const initValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const [values, setValues] = useState(initValues);

  function onSubmit() {
    selectedEvent
      ? updateEvent({ ...selectedEvent, ...values })
      : addEvent({
        ...values, id: createId(), hostedBy: 'bog', attendees: [], hostPhotoURL: ''
      });
    setFormOpen(false);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Update event' : 'Create Event'} />
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
          type='button'
          floated='right'
          content='Cancel'
          onClick={() => setFormOpen(false)}
        />
      </Form>
    </Segment>
  );
}