import React from "/web_modules/react.js";
import { Label } from "/web_modules/evergreen-ui.js";
import { Wrapper, Err, MyTextInputField, MySelectField, MyTextarea, compress } from "./Fields.js";
import { Formik, Field, ErrorMessage } from "/web_modules/formik.js";
import { AddVisitSchema } from "./Validation.js";

const AddVisit = () => {
  return React.createElement(Formik, {
    validationSchema: AddVisitSchema
  }, ({
    isSubmitting,
    values,
    handleReset,
    handleSubmit
  }) => {
    return React.createElement(Wrapper, null, React.createElement("form", {
      onReset: handleReset,
      onSubmit: handleSubmit,
      noValidate: true
    }, React.createElement(ErrorMessage, {
      component: Err,
      name: 'clinic'
    }), React.createElement(Field, {
      name: "clinic",
      as: MySelectField,
      label: "Choose Clinic"
    }, ['Choose as Clinic', 'a clinic', 'b clinic'].map(name => React.createElement("option", {
      key: name,
      value: name,
      children: name
    }))), React.createElement(ErrorMessage, {
      component: Err,
      name: 'providers'
    }), React.createElement(MyTextInputField, {
      label: "Add Receipt",
      type: "file",
      capture: true,
      width: 250,
      marginBottom: 32,
      onChange: e => compress(e, this.uploadReceipt)
    }), React.createElement(ErrorMessage, {
      component: Err,
      name: 'date'
    }), React.createElement(Field, {
      name: "date",
      label: "Date",
      type: "datetime-local",
      as: MyTextInputField
    }), React.createElement(ErrorMessage, {
      component: Err,
      name: 'reason'
    }), React.createElement(Field, {
      name: "reason",
      as: MySelectField,
      label: "Reason For Visit"
    }, React.createElement("option", {
      value: "0",
      key: 0
    }, "Choose a Reason"), ['thing1', 'thing2'].map(n => React.createElement("option", {
      value: n,
      key: n
    }, n))), React.createElement(ErrorMessage, {
      component: Err,
      name: 'amountSpent'
    }), React.createElement(Field, {
      inputMode: "decimal",
      name: "amountSpent",
      as: MyTextInputField,
      label: "Enter Amount Spent"
    }), React.createElement(Label, null, "Additional Notes:", React.createElement(Field, {
      name: "notes",
      as: MyTextarea
    })), React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, React.createElement("div", {
      style: {
        margin: 'auto'
      }
    }, isSubmitting && 'Adding Visit'))));
  });
};

export default AddVisit;