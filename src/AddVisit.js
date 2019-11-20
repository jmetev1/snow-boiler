/*eslint-disable no-unused-vars*/
import React from 'react';
import { TextInputField, SelectField, Checkbox, Button, FormField, } from 'evergreen-ui';
import { url, getMyClinics, automatic } from './url';
import { firstState, reasons } from './data';
import { Select } from 'evergreen-ui/commonjs/select';
import { SelectClinic, Wrapper, SubmitButton, DevInfo, Err } from './Fields';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { AddVisitSchema } from './Validation';

class AddVisit extends React.Component {
  constructor() {
    super();
    this.state = firstState()
    this.state.allMyClinics = [];
  }
  componentDidMount() {
    getMyClinics().then(r => this.setState({ allMyClinics: r }));
    this.getAllProviders()
  }
  async getAllProviders() {
    const providersByClinic = await fetch(url + 'getproviders', { method: 'GET' }).then(r => r.json())
    this.setState({ providersByClinic })
  }
  submit = async (values, actions) => {
    Object.entries(values).forEach(([k, v]) => console.log(k + ' ' + v))
    const body = JSON.stringify(values)
    console.log(body)
    await fetch(url + 'visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    }).then(res => {
      console.log(61, res)
      if (!res.ok) throw new Error('error posting');
    })
  }
  render() {
    const { providersByClinic, allMyClinics, clinic } = this.state;
    return (
      <Formik
        // initialValues={{
        //   clinic: "5dc33f20acaf6659567af212", date: '2019-12-30T12:59',
        //   // providers: ["5dc33f35acaf6659567af215"],
        //   providers: [],
        //   reason: 'Educational Lunch',
        //   amountSpent: '111',
        // }}
        initialValues={{ date: '', providers: [], amountSpent: '', reason: '0' }}
        validationSchema={AddVisitSchema}
        onSubmit={this.submit}
      >
        {({ isSubmitting, values, ...rest }) => {
          console.log(rest.errors)
          return <Wrapper>
            <Form>
              <See values={values} />
              <ErrorMessage component={Err} name={'clinic'} />
              <Field name="clinic" as={SelectField} label="Choose Clinic" >
                <option key={0} value={0}>Choose Clinic</option>
                {allMyClinics.map(({ _id, name }) =>
                  <option key={_id} value={_id} children={name} />)}
              </Field>
              <ErrorMessage component={Err} name={'date'} />
              <Field name="date" label="Date"
                type="datetime-local" as={TextInputField}
                autoComplete="true" />
              <SelectProvider providersByClinic={providersByClinic} clinic={values.clinic} />
              <ErrorMessage component={Err} name={'reason'} />
              <Field name="reason" as={SelectField} label="Reason For Visit">
                <option value="0" key={0}>Choose a Reason</option>
                {reasons.map(n => <option value={n} key={n}>{n}</option>)}
              </Field>
              <ErrorMessage component={Err} name={'amountSpent'} />
              <Field name="amountSpent" as={TextInputField} label="Enter Amount Spent" />
              <label>Additional Notes:
              <div><Field name="notes" as="textarea" /></div>
              </label>
              <TextInputField type="file" capture="camera" accept="image/*" label="Add Receipt" />
              <div>
                <Button type="submit" disabled={isSubmitting} children="Submit" />
              </div>
            </Form>
          </Wrapper>
        }}
      </Formik>
    );
  }
}

const See = ({ values, errors }) => <DevInfo>
  {Object.entries(values)
    .map(([key, value]) => <div key={key}>{key} value is {value || 'empty'}</div>)}
</DevInfo>

const SelectProvider = ({ providersByClinic, clinic, ...rest }) => {
  const providers = (providersByClinic && providersByClinic[clinic]) || []
  return <FormField label="Choose Providers" >
    <ErrorMessage component={Err} name={'providers'} />
    {providers.map(({ _id, name }) =>
      <Field key={_id} label={name}
        as={Checkbox} type="checkbox" name="providers"
        value={_id} />)}
  </FormField>
}

export { AddVisit };