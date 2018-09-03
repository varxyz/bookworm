import React from 'react';
import { Formik } from 'formik';
import { Card, Button, Form } from 'semantic-ui-react';

const Basic = () => (
  <Card centered>
    <Card.Content>
      <Card.Header textAlign="center">Log In</Card.Header>
    </Card.Content>
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validate={values => {
        // same as above, but feel free to move this into a class method now.
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(
        values,
        { setSubmitting, setErrors /* setValues and other goodies */ }
      ) => {
        LoginToMyApp(values).then(
          user => {
            setSubmitting(false);
            // do whatevs...
            // props.updateUser(user)
          },
          errors => {
            setSubmitting(false);
            // Maybe transform your API's errors into the same shape as Formik's
            setErrors(transformMyApiErrors(errors));
          }
        );
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Card.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Email</label>
              <Form.Input
                error={touched.email && errors.email ? true : false}
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </Form.Field>
            <Form.Field>
            <label>Password</label>

              <Form.Input
                error={touched.password &&
                errors.password}
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Form.Field>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        </Card.Content>
      )}
    />
  </Card>
);

export default Basic;
