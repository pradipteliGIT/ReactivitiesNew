import { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

const ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    loading,
    loadingInitial,
    loadActivity,
    createActivity,
    updateActivity,
  } = activityStore;
  const { id } = useParams();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: '',
  });
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title required'),
    description: Yup.string().required('The activity title required'),
    date: Yup.string().required('Date is required').nullable(),
    category: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });
  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleFromSubmit = (activity: Activity) => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial) return <LoadingComponent content='Loading Activity...' />;

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFromSubmit(values)}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput placeholder='Title' name='title' />
            <MyTextArea rows={3} placeholder='Description' name='description' />
            <MySelectInput
              options={categoryOptions}
              placeholder='Category'
              name='category'
            />
            <MyDateInput
              placeholderText='Date'
              name='date'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <Header content='Location Details' sub color='teal' />
            <MyTextInput placeholder='City' name='city' />
            <MyTextInput placeholder='Venue' name='venue' />
            <Button
              floated='right'
              positive
              type='submit'
              content='Submit'
              loading={loading}
              disabled={isSubmitting || !isValid || !isValid}
            ></Button>
            <Button
              as={Link}
              to='/activities'
              floated='right'
              type='button'
              content='Cancel'
            ></Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
};
export default observer(ActivityForm);
