import React from 'react';
import { Button, Pane } from 'evergreen-ui';
import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { url } from './url';
import { Authorized } from './Authorized';
import { Err, MyTextInputField } from './Fields';
import { LoginSchema } from './Validation';
import logo from './image/pnglogo.png';
const dev = process.env.NODE_ENV === 'development';

let options = {
  dev,
  validate: true,
  prefill: false,
  showState: dev,
};
const newUser = !!localStorage.dev;
for (let key in options) {
  if (newUser) options[key] = localStorage.getItem(key) === 'true' || false;
  else localStorage.setItem(key, options[key]);
}

export const OptionsContext = React.createContext({
  updateOptions: (key, value) => console.log('the default update options'),
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ...options,
      updateOptions: (key, { target: { checked } }) => {
        localStorage[key] = checked;
        this.setState(Object.fromEntries([[key, checked]]));
      },
    };
    this.state.region = options.dev ? 'nm' : undefined;
  }

  submit = values => {
    fetch(`${url}login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(r => r.json())
      .then(region => this.setState({ region }));
  };

  componentDidMount() {
    if (!options.dev) {
      this.props.region
        .then(res => res.json())
        .then(info => this.setState({ region: info.rep }))
        .catch(e => {
          throw new Error('app js setState on comp did mount');
        });
    }
  }

  Login = () => (
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
              ? { username: 'nm', password: 'pglForLife' }
              : { username: '', password: '' }
          }
          // { username: "admin", password: "Wepgl4life" }}
          onSubmit={this.submit}
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
              {this.state.region === false && 'login failed'}
            </Form>
          )}
        </Formik>
      </Pane>
    </Pane>
  );
  render() {
    return (
      <React.StrictMode>
        <OptionsContext.Provider value={this.state}>
          {this.state && this.state.region ? (
            <Authorized route={this.props.route} />
          ) : (
            <this.Login />
          )}
        </OptionsContext.Provider>
      </React.StrictMode>
    );
  }
}
