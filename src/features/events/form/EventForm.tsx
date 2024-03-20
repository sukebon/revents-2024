import { Button, Form, Header, Segment } from 'semantic-ui-react';

interface EventFormProps {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EventForm({ setFormOpen }: EventFormProps) {
  return (
    <Segment clearing>
      <Header content='Create Event' />
      <Form>
        <Form.Field>
          <input type="text" placeholder='Event title' />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder='Category' />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder='Description' />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder='City' />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder='Venue' />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder='Date' />
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