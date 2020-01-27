import React, { useState } from "/web_modules/react.js";
import { Button, Pane } from "/web_modules/evergreen-ui.js"; // import './App.css';

import { Formik, Form, Field, ErrorMessage } from "/web_modules/formik.js";
import { url } from "./url.js";
import { Err, MyTextInputField } from "./Fields.js";
import { LoginSchema } from "./Validation.js";
import { Redirect } from "/web_modules/react-router-dom.js";

const Login = ({
  setUser,
  user
}) => {
  const [failed, setFailed] = useState(false);

  const submit = values => {
    fetch(`${url}login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.json()).then(loginResult => {
      if (loginResult) setUser(loginResult);else setFailed(true);
    });
  };

  return user ? React.createElement(Redirect, {
    to: "/"
  }) : React.createElement(Pane, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh"
  }, React.createElement(Pane, {
    width: "90vw",
    border: "default"
  }, React.createElement("img", {
    src: "../image/pnglogo.png",
    height: "47px",
    alt: "pgl logo"
  }), React.createElement(Formik, {
    initialValues: {
      username: 'test',
      password: 'wonderboy'
    },
    onSubmit: submit,
    validationSchema: LoginSchema
  }, ({
    isSubmitting
  }) => React.createElement(Form, null, React.createElement(ErrorMessage, {
    component: Err,
    name: "username"
  }), React.createElement(Field, {
    as: MyTextInputField,
    name: "username",
    label: "Username"
  }), React.createElement(ErrorMessage, {
    component: Err,
    name: "password"
  }), React.createElement(Field, {
    as: MyTextInputField,
    name: "password",
    label: "Password",
    type: "password"
  }), React.createElement(Button, {
    type: "submit",
    disabled: isSubmitting,
    children: "Submit"
  }), failed && React.createElement(Pane, {
    width: "90vw",
    border: "default"
  }, "'Password or username is incorrect, please try again or contact tech support at 985-966-5497'")))));
};

export default Login;