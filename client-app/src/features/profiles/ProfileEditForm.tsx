import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import MyTextArea from '../../app/common/form/MyTextArea';
import MyTextInput from '../../app/common/form/MyTextInput';
import * as Yup from 'yup';
import { Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

interface Props {
  setEditMode: (editMode: boolean) => void;
}

function ProfileEditForm({ setEditMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) => {
        updateProfile(values).then(() => {
          setEditMode(false);
        });
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className='ui form'>
          <MyTextInput name='displayName' placeholder='DisplayName' />
          <MyTextArea name='bio' placeholder='Bio' rows={3} />
          <Button
            floated='right'
            positive
            type='submit'
            content='Submit'
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
          ></Button>
          <Button
            onClick={() => setEditMode(false)}
            floated='right'
            type='button'
            content='Cancel'
          ></Button>
        </Form>
      )}
    </Formik>
  );
}

export default observer(ProfileEditForm);
