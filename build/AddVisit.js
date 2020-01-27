function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "/web_modules/react.js";
import { Checkbox, Button, FormField, Label, Pane } from "/web_modules/evergreen-ui.js";
import { url, getMyClinics } from "./url.js";
import { reasons } from "./data";
import { Wrapper, DevInfo, Err, MyTextInputField, MySelectField, MyTextarea, compress } from "./Fields";
import { Formik, Field, ErrorMessage } from "/web_modules/formik.js";
import { AddVisitSchema } from "./Validation";
import { Link } from "/web_modules/react-router-dom.js";
export default class AddVisit extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      allMyClinics: [],
      submitError: null
    });

    _defineProperty(this, "submit", (values, {
      resetForm
    }) => {
      values.amountSpent = Number(Number(values.amountSpent).toFixed(2));
      fetch(url + 'visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values,
          receiptID: this.state.receiptID || '',
          clinicName: this.state.allMyClinics.find(clinic => clinic._id === values.clinic)?.name || 'name not found'
        })
      }).then(res => res.json()).then(res => {
        if (window.pglOptions.dev) {
          res.email.forEach(console.table);
        }

        if (res && res._id) {
          alert('Successfully Submitted');
          this.props.history.push('pastvisits');
        } else this.setState({
          submitError: res
        });
      });
    });

    _defineProperty(this, "uploadReceipt", file => {
      const data = new FormData();
      data.append('myFile', file);
      fetch(url + 'receipt', {
        method: 'POST',
        body: data
      }).then(r => {
        if (r.ok) return r.json();
        this.setState({
          receiptUpload: 'Upload failed, please contact tech support'
        });
        throw new Error('Upload failed, please contact tech support');
      }).then(receiptID => this.setState({
        receiptID,
        receiptSubmitted: true
      }));
    });
  }

  componentDidMount() {
    getMyClinics().then(allMyClinics => this.setState({
      allMyClinics
    }));
    fetch(url + 'getproviders').then(r => r.json()).then(providersByClinic => {
      this.setState({
        providersByClinic
      });
    });
  }

  render() {
    const {
      providersByClinic,
      allMyClinics
    } = this.state;
    let {
      validate,
      dev,
      prefill
    } = window.pglOptions;
    return React.createElement(Formik, {
      initialValues: prefill ? {
        clinic: '5e025ebe112a290f5bf2cd26',
        date: '2020-11-30T12:59',
        providers: [],
        reason: 'Educational Lunch',
        amountSpent: 400,
        materials: []
      } : {
        clinic: '',
        date: '',
        providers: [],
        reason: '0',
        amountSpent: '',
        materials: []
      },
      validationSchema: validate && AddVisitSchema,
      onSubmit: this.submit
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
      }, React.createElement(See, {
        values: values
      }), React.createElement(ErrorMessage, {
        component: Err,
        name: 'clinic'
      }), React.createElement(Field, {
        name: "clinic",
        as: MySelectField,
        label: "Choose Clinic"
      }, [{
        _id: 0,
        name: 'Choose Clinic'
      }, ...allMyClinics].map(({
        _id,
        name
      }) => React.createElement("option", {
        key: _id,
        value: _id,
        children: name
      }))), React.createElement(ErrorMessage, {
        component: Err,
        name: 'providers'
      }), React.createElement(SelectProvider, {
        providersByClinic: providersByClinic,
        clinic: values.clinic
      }), React.createElement(MyTextInputField, {
        label: "Add Receipt",
        type: "file",
        capture: true,
        width: 250,
        marginBottom: 32,
        onChange: e => compress(e, this.uploadReceipt)
      }), this.state.receiptUpload, React.createElement(ErrorMessage, {
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
      }, "Choose a Reason"), reasons.map(n => React.createElement("option", {
        value: n,
        key: n
      }, n))), React.createElement(SelectMaterials, null), React.createElement(ErrorMessage, {
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
      }, dev && React.createElement("button", {
        type: "submit"
      }, "check"), this.state.receiptSubmitted || !validate ? React.createElement(Button, {
        type: "submit",
        disabled: isSubmitting,
        children: "Submit",
        height: 60
      }) : 'Please Attach A Receipt Before Submitting', isSubmitting && 'Adding Visit', this.state.submitError && this.state.submitError))));
    });
  }

}

const See = ({
  values,
  errors
}) => React.createElement(DevInfo, null, Object.entries(values).map(([key, value]) => React.createElement("div", {
  key: key
}, key, " value is ", value || 'empty')));

const SelectMaterials = () => React.createElement(FormField, {
  label: "Choose Materials"
}, React.createElement(ErrorMessage, {
  component: Err,
  name: 'materials'
}), React.createElement(Pane, {
  style: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
}, ['1', '2', '3', '4', '5'].map(n => React.createElement(Field, {
  style: {
    flex: '1 0 33%'
  },
  key: n,
  label: `Material ${n}`,
  as: Checkbox,
  type: "checkbox",
  name: "materials",
  value: n
}))));

const SelectProvider = ({
  providersByClinic,
  clinic,
  ...rest
}) => {
  if (!clinic) return 'Please Select A Clinic';
  const providers = providersByClinic && providersByClinic[clinic];

  if (providers && providers.length) {
    return React.createElement(FormField, {
      label: "Providers Present At Meeting"
    }, providersByClinic[clinic].map(({
      _id,
      name
    }) => React.createElement(Field, {
      key: _id,
      label: name,
      as: Checkbox,
      type: "checkbox",
      name: "providers",
      value: _id
    })));
  } else {
    return React.createElement(React.Fragment, null, "This Clinic Has No Providers, Please Add One", ' ', React.createElement(Link, {
      to: "/addprovider"
    }, "Here"));
  }
};