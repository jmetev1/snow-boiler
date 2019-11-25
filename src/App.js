import React from 'react';
import { Button } from 'evergreen-ui/commonjs/buttons';
import './App.css'
import { url } from './url';
import { Authorized } from './Authorized';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Wrapper, Err } from './Fields';
import { TextInputField, Pane } from 'evergreen-ui';
import { LoginSchema } from './Validation';
import logo from './image/pnglogo.png'

class App extends React.Component {
  submit = values => {
    fetch(url + 'login', {
      method: "POST",
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json()).then(region => {
      this.setState({ region })
    })
  }
  componentDidMount() {
    this.props.region.then(res => res.json())
      .then(info => {
        this.setState({ region: info.rep })
      })
      .catch(e => { throw new Error('app js setstate on comp did mount') })
  }
  Login = () => <Pane
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="70vh"
  >
    <Pane
      width="90vw"
      border="default">

      <img src={logo} height="47px" alt="pgl logo" />
      <Formik initialValues={process.env.NODE_ENV === "development" ?
        { username: "nm", password: "pglForLife" } :
        { username: '', password: '' }}
        // { username: "admin", password: "Wepgl4life" }}
        onSubmit={this.submit}
        validationSchema={LoginSchema}>
        {({ isSubmitting }) => <Form>
          <ErrorMessage component={Err} name={'username'} />
          <Field as={TextInputField} name="username" label="Username" />
          <ErrorMessage component={Err} name={'password'} />
          <Field as={TextInputField} name="password" label="Password" type="password" />
          <Button type="submit" disabled={isSubmitting} children="Submit" />
        </Form>}
      </Formik>
    </Pane>
  </Pane>

  render() {
    return <React.StrictMode >
      {(this.state && this.state.region) ? <Authorized /> : < this.Login />}
    </React.StrictMode>
  }
}

export default App;


