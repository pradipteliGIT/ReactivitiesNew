import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Header } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationError from '../errors/ValidationError';

function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: '',
        userName: '',
        email: '',
        password: '',
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        userName: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
          <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
          <MyTextInput placeholder='DisplayName' name='displayName' />
          <MyTextInput placeholder='UserName' name='userName' />
          <MyTextInput placeholder='Email' name='email' type='email' />
          <MyTextInput placeholder='Password' name='password' type='password' />
          <ErrorMessage name='error' render={() => <ValidationError errors={errors.error} />} />
          <Button
            loading={isSubmitting}
            disabled={!isValid || !dirty || isSubmitting}
            positive
            type='submit'
            content='Register'
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}

export default observer(RegisterForm);
