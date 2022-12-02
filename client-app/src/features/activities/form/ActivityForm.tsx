import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
interface Props {
  activity: Activity | undefined;
  submitting: boolean;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}
const ActivityForm = ({
  activity: selectedActivity,
  submitting,
  closeForm,
  createOrEdit,
}: Props) => {
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  const handleSubmit = () => {
    createOrEdit(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input
          placeholder='Title'
          value={activity.title}
          name='title'
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          value={activity.description}
          name='description'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Category'
          value={activity.category}
          name='category'
          onChange={handleInputChange}
        />
        <Form.Input
          type='date'
          placeholder='Date'
          value={activity.date}
          name='date'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          value={activity.city}
          name='city'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Venue'
          value={activity.venue}
          name='venue'
          onChange={handleInputChange}
        />
        <Button
          floated='right'
          positive
          type='submit'
          content='Submit'
          loading={submitting}
        ></Button>
        <Button
          onClick={() => closeForm()}
          floated='right'
          type='button'
          content='Cancel'
        ></Button>
      </Form>
    </Segment>
  );
};
export default ActivityForm;