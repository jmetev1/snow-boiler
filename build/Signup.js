import React from "/web_modules/react.js";
import { Button, Pane } from "/web_modules/evergreen-ui.js";
import "./App.css";
import { Formik, Form, Field, ErrorMessage } from "/web_modules/formik.js";
import { url } from "./url.js";
import { Err, MyTextInputField } from "./Fields";
import { LoginSchema, SignupSchema } from "./Validation";
import logo from "./image/pnglogo.png";
const dev = process.env.NODE_ENV === 'development';

const Signup = () => {
  const submit = values => {
    values.newUser = true;
    fetch(`${url}login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  return React.createElement(Pane, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh"
  }, React.createElement(Pane, {
    width: "90vw",
    border: "default"
  }, React.createElement("img", {
    src: logo,
    height: "47px",
    alt: "pgl logo"
  }), React.createElement(Formik, {
    onSubmit: submit,
    validationSchema: SignupSchema
  }, ({
    isSubmitting
  }) => React.createElement(Form, null, React.createElement(ErrorMessage, {
    component: Err,
    name: "username"
  }), React.createElement(Field, {
    as: MyTextInputField,
    name: "email",
    label: "Username"
  }), React.createElement(ErrorMessage, {
    component: Err,
    name: "password"
  }), React.createElement(Field, {
    as: MyTextInputField,
    name: "password",
    label: "Password"
  }), React.createElement(Field, {
    as: MyTextInputField,
    name: "password2",
    label: "Password Confirm"
  }), React.createElement(Button, {
    type: "submit",
    disabled: isSubmitting,
    children: "Submit"
  })))));
};

export default Signup;