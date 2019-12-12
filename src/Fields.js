import React, { useState, useEffect } from 'react';
import {
  Pane,
  Button,
  SelectField,
  TextInputField,
  Textarea,
} from 'evergreen-ui';
import { showState, url } from './url';

const height = 48;

export const MySelectField = (props) => (
  <SelectField {...props} inputHeight={height} />
);
export const MyTextarea = (props) => (
  <Textarea {...props} style={{ fontSize: '16px' }} />
);

export const MyTextInputField = (props) => (
  <TextInputField {...props} inputHeight={height} />
);

export const SelectClinic = function () {
  return this.state.allMyClinics ? (
    <MySelectField
      label="Choose a Clinic"
      onChange={(event) => this.addValue('clinic', event)}
    >
      <option key={0} value={0}>
        Choose A Clinic
      </option>
      {this.state.allMyClinics.map(({ _id, name }) => (
        <option key={_id} value={_id}>
          {name}
        </option>
      ))}
    </MySelectField>
  ) : (
      'loading Clinics'
    );
};

export const Wrapper = ({ children }) => (
  <Pane display="flex" padding={6} background="tint2" borderRadius={3}>
    <Pane flex={1} alignItems="center">
      {children}
    </Pane>
  </Pane>
);

export const SubmitButton = function () {
  const doIt = () => {
    this.setState({ submitted: false, waiting: true }, async () => {
      await this.submit();
      this.setState({ submitted: true });
    });
  };
  const reload = () => location.reload(); //eslint-disable-line
  const { submitted, waiting } = this.state;
  if (waiting && !submitted) return 'Submitting Data';
  return submitted ? (
    <div>
      'Successfully Submitted'
      <button onClick={reload}>Add Another</button>
    </div>
  ) : (
      <Button onClick={doIt} appearance="primary" children="Submit" />
    );
};

export const DevInfo = ({ children }) => (showState ? <>{children}</> : null);

export const addValue = function (key, event) {
  const newState = {};
  const { value } = event.target;
  newState[key] = value;
  this.setState(newState);
};

export const OneClinic = ({ clinicID, visits = [], clinicName }) => {
  const [spending, updateSpending] = useState({});
  const [visitID, updateVisitID] = useState(null);
  useEffect(() => {
    fetch(`${url}getSpendingByDoctor/${clinicID}`)
      .then((d) => d.json())
      .then(updateSpending)
      .then((a) => updateVisitID('5ddc8639e8705d24251d60c3'));
  }, [clinicID]);
  const nameAmountPairs = Object.values(spending);
  return nameAmountPairs.length ? (
    <>
      In the last year your total spending by provider at this clinic has been:
      {nameAmountPairs.map(({ amount, name: drName, ...rest }) => (
        <div key={drName}>
          {drName}: ${amount}
        </div>
      ))}
      <h2>Visits to {clinicName} </h2>
      <MySelectField
        label="Choose Visit To See Details"
        onChange={({ target }) => updateVisitID(target.value)}
      >
        <option value="0">Choose a Date</option>
        {visits.map(
          ({
            providers, amountSpent, date, materials, receipt, _id
          }) => (
              <option key={_id} value={_id}>
                {new Date(date).toLocaleDateString()}
              </option>
            ),
        )}
      </MySelectField>
      <OneVisit visitID={visitID} visits={visits} spending={spending} />
    </>
  ) : (
      'Choose Clinic Or None Found'
    );
};

const OneVisit = ({ visitID, visits, spending }) => {
  console.log(visitID, visits, 'in one visit');
  if (!visitID || visitID === '0') return 'Choose a Date';

  const relevantVisits = visits.filter(({ _id }) => _id === visitID);
  if (!relevantVisits.length) return 'Loading or none found';

  const {
    amountSpent, providers, materials, receiptID
  } = relevantVisits[0];
  const size = '250px';
  return (
    <>
      <h4>For This Visit</h4>
      <div>
        Amount Spent:
{' '}
        {amountSpent}
      </div>
      <div>
        Materials:
{' '}
        {materials}
      </div>
      <div>
        Providers Present:
        {providers.map((providerID) => (
          <div key={providerID}>{spending[providerID].name}</div>
        ))}
      </div>
      <img
        height={size}
        width={size}
        src={`${url}receipt/${receiptID}`}
        alt="receipt"
      />
    </>
  );
};

export const Err = ({ children }) => (
  <div style={{ background: 'red' }}>{children}</div>
);

// export const SelectProvider = function ({ providers }) {
//   return providers ?
//     <Wrapper>
//       Choose Providers Present
//       {Object.values(providers).map(({ _id, name, chosen }) => <Checkbox
//         key={_id}
//         label={name}
//         checked={chosen}
//         onChange={() => {
//           providers[_id].chosen = !chosen
//           this.setState({ providerOptionsAtOneClinic: providers })
//         }}
//       />)}
//     </Wrapper> : 'Loading Providers'
// }
