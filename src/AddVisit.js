import React from 'react';
import { Label } from 'evergreen-ui';
import {
  Wrapper,
  Err,
  MyTextInputField,
  MySelectField,
  MyTextarea,
  compress,
} from './Fields.js';
import { Formik, Field, ErrorMessage } from 'formik';
import { AddVisitSchema } from './Validation.js';

const AddVisit = () => {
  return (
    <Formik validationSchema={AddVisitSchema}>
      {({ isSubmitting, values, handleReset, handleSubmit }) => {
        return (
          <Wrapper>
            <form onReset={handleReset} onSubmit={handleSubmit} noValidate>
              <ErrorMessage component={Err} name={'clinic'} />
              <Field name="clinic" as={MySelectField} label="Choose Clinic">
                {['Choose as Clinic', 'a clinic', 'b clinic'].map(name => (
                  <option key={name} value={name} children={name} />
                ))}
              </Field>
              <ErrorMessage component={Err} name={'providers'} />
              <MyTextInputField
                label="Add Receipt"
                type="file"
                capture={true}
                width={250}
                marginBottom={32}
                onChange={e => compress(e, this.uploadReceipt)}
              />
              <ErrorMessage component={Err} name={'date'} />
              <Field
                name="date"
                label="Date"
                type="datetime-local"
                as={MyTextInputField}
              />
              <ErrorMessage component={Err} name={'reason'} />
              <Field name="reason" as={MySelectField} label="Reason For Visit">
                <option value="0" key={0}>
                  Choose a Reason
                </option>
                {['thing1', 'thing2'].map(n => (
                  <option value={n} key={n}>
                    {n}
                  </option>
                ))}
              </Field>
              <ErrorMessage component={Err} name={'amountSpent'} />
              <Field
                inputMode="decimal"
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
                  {isSubmitting && 'Adding Visit'}
                </div>
              </div>
            </form>
          </Wrapper>
        );
      }}
    </Formik>
  );
};
export default AddVisit;
