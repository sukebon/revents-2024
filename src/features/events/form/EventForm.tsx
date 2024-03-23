import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';

export default function EventForm() {

  const initValues = {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const [values, setValues] = useState(initValues);

  function onSubmit() {
    console.log(values);
    // selectedEvent
    //   ? updateEvent({ ...selectedEvent, ...values })
    //   : addEvent({
    //     ...values, id: createId(), hostedBy: 'bog', attendees: [], hostPhotoURL: ''
    //   });
    // setFormOpen(false);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }

  return (
    <Segment clearing>
      <Header content={'Create Event'} />
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