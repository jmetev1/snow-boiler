import React from "react";
import { Checkbox, Button, FormField, Label } from "evergreen-ui";
import { url, getMyClinics, automatic } from "./url";
import { firstState, reasons } from "./data";
import {
  Wrapper,
  DevInfo,
  Err,
  MyTextInputField,
  MySelectField,
  MyTextarea
} from "./Fields";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { AddVisitSchema } from "./Validation";

class AddVisit extends React.Component {
  constructor() {
    super();
    this.state = firstState();
    this.state.allMyClinics = [];
    this.state.submitError = null;
  }

  componentDidMount() {
    getMyClinics().then(r => this.setState({ allMyClinics: r }));
    fetch(url + "getproviders")
      .then(r => r.json())
      .then(providersByClinic => this.setState({ providersByClinic }));
  }

  submit = (values, { resetForm, ...rest }) =>
    fetch(url + "visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        receiptID: this.state.receiptID,
        clinicName: this.state.allMyClinics.find(
          clinic => clinic._id === values.clinic
        ).name
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res && res._id) {
          resetForm();
          alert("Successfully Submitted");
        } else this.setState({ submitError: res });
      });

  uploadReceipt = ({ target: { files } }) => {
    const data = new FormData();
    data.append("myFile", files[0]);
    fetch(url + "receipt", {
      method: "POST",
      body: data
    })
      .then(r => {
        if (r.ok) return r.json();
        else {
          const receiptUpload = "Upload failed, please contact tech support";
          this.setState({ receiptUpload });
          throw new Error(receiptUpload);
        }
      })
      .then(receiptID => this.setState({ receiptID, receiptSubmitted: true }));
  };
  render() {
    console.log(this.state);
    const { providersByClinic, allMyClinics, clinic } = this.state;
    return (
      <Formik
        initialValues={
          process.env.NODE_ENV === "development"
            ? {
              clinic: "5dc33f20acaf6659567af212",
              date: "2019-12-30T12:59",
              providers: [],
              reason: "Educational Lunch",
              amountSpent: 100 * Math.random()
            }
            : { date: "", providers: [], amountSpent: "", reason: "0" }
        }
        validationSchema={AddVisitSchema}
        onSubmit={this.submit}
      >
        {({ isSubmitting, values, ...rest }) => (
          <Wrapper>
            <Form>
              <See values={values} />
              <ErrorMessage component={Err} name={"clinic"} />
              <Field name="clinic" as={MySelectField} label="Choose Clinic">
                <option key={0} value={0}>
                  Choose Clinic
                </option>
                {allMyClinics.map(({ _id, name }) => (
                  <option key={_id} value={_id} children={name} />
                ))}
              </Field>
              <MyTextInputField
                label="Add Receipt"
                type="file"
                capture={true}
                width={250}
                marginBottom={32}
                onChange={this.uploadReceipt}
              />
              <ErrorMessage component={Err} name={"date"} />
              <Field
                name="date"
                label="Date"
                type="datetime-local"
                as={MyTextInputField}
                autoComplete="true"
              />
              <SelectProvider
                providersByClinic={providersByClinic}
                clinic={values.clinic}
              />
              <ErrorMessage component={Err} name={"reason"} />
              <Field name="reason" as={MySelectField} label="Reason For Visit">
                <option value="0" key={0}>
                  Choose a Reason
                </option>
                {reasons.map(n => (
                  <option value={n} key={n}>
                    {n}
                  </option>
                ))}
              </Field>
              <ErrorMessage component={Err} name={"amountSpent"} />
              <Field
                name="amountSpent"
                as={MyTextInputField}
                label="Enter Amount Spent"
              />
              <Label>
                Additional Notes:
                <Field name="notes" as={MyTextarea} />
              </Label>
              <div style={{ display: 'flex' }}>
                <div style={{ margin: 'auto' }}>
                  {this.state.receiptSubmitted ? (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      children="Submit"
                      height={60}
                    />
                  ) : (
                      "Please Attach A Receipt Before Submitting"
                    )}
                  {isSubmitting && "Adding Visit"}
                  {this.state.submitError && this.state.submitError}
                </div>
              </div>
            </Form>
          </Wrapper>
        )}
      </Formik>
    );
  }
}

const See = ({ values, errors }) => (
  <DevInfo>
    {Object.entries(values).map(([key, value]) => (
      <div key={key}>
        {key} value is {value || "empty"}
      </div>
    ))}
  </DevInfo>
);

const SelectProvider = ({ providersByClinic, clinic, ...rest }) => {
  const providers = (providersByClinic && providersByClinic[clinic]) || [];
  return (
    <FormField label="Choose Providers">
      <ErrorMessage component={Err} name={"providers"} />
      {providers.map(({ _id, name }) => (
        <Field
          key={_id}
          label={name}
          as={Checkbox}
          type="checkbox"
          name="providers"
          value={_id}
        />
      ))}
    </FormField>
  );
};

export { AddVisit };
