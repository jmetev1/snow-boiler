import React, { lazy } from 'react';
import { Button, Pane } from 'evergreen-ui';
import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { url } from './url';
import { Authorized } from './App';
import { Err, MyTextInputField } from './Fields';
import { LoginSchema } from './Validation';
import logo from './image/pnglogo.png';
import { Redirect } from 'react-router-dom';

const Login = ({ setUser, user }) => {
  const submit = values => {
    fetch(`${url}login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(r => r.json())
      .then(setUser);
  };

  // console.log('login', user);
  return user ? (
    <Redirect to="/" />
  ) : (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="70vh"
    >
      <Pane width="90vw" border="default">
        <img src={logo} height="47px" alt="pgl logo" />
        <Formik
          initialValues={
            process.env.NODE_ENV === 'development'
              ? { username: 'test', password: 'wonderboy' }
              : { username: '', password: '' }
          }
          onSubmit={submit}
          validationSchema={LoginSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <ErrorMessage component={Err} name="username" />
              <Field as={MyTextInputField} name="username" label="Username" />
              <ErrorMessage component={Err} name="password" />
              <Field
                as={MyTextInputField}
                name="password"
                label="Password"
                type="password"
              />
              <Button type="submit" disabled={isSubmitting} children="Submit" />
              {/* {this.state.region === false && 'login failed'} */}
            </Form>
          )}
        </Formik>
      </Pane>
    </Pane>
  );
};

export default Login;
