import React, { useState, useEffect } from 'react';
import {
  Pane, Button, SelectField, TextInputField,
} from 'evergreen-ui';
import { showState, url } from './url';

export const SelectClinic = function () {
  return this.state.allMyClinics ?
    <SelectField
      label="Choose a Clinic"
      onChange={event => this.addValue('clinic', event)}
    >
      <option key={0} value={0}>Choose A Clinic</option>
      {this.state.allMyClinics.map(({ _id, name }) =>
        <option key={_id} value={_id}>{name}</option>
      )}
    </SelectField> : 'loading Clinics'
}

export const Provider = function () {
  return <TextInputField
    label="A controlled text input field"
    required
    description="Name of provider"
    value={this.state.provider}
    onChange={this.addValue.bind(this, 'provider')}
  />
}
export const Wrapper = ({ children }) => (
  <Pane display="flex" padding={6} background="tint2" borderRadius={3}>
    <Pane flex={1} alignItems="center" >
      {children}
    </Pane>
  </Pane>
);

export const SubmitButton = function () {
  const doIt = () => {
    console.log(this)
    this.setState({ submitted: false, waiting: true }, async () => {
      await this.submit();
      this.setState({ submitted: true })
    })
  }
  const reload = () => location.reload(); //eslint-disable-line
  const { submitted, waiting } = this.state;
  if (waiting && !submitted) return 'Submitting Data'
  if (submitted) return (
    <div>
      'Successfully Submitted'
      <button onClick={reload}>Add Another</button>
    </div>)
  return <Button onClick={doIt} appearance="primary">Submit</Button>
}

export const DevInfo = ({ children }) => showState ? <>{children}</> : null
export const addValue = function (key, event) {
  const newState = {};
  const { value } = event.target
  newState[key] = value
  this.setState(newState)
}

export const OneClinic = ({ clinicID, visits = [], name }) => {
  const [spending, updateSpending] = useState({})
  const [visitID, updateVisitID] = useState(null)
  useEffect(() => { fetch(url + `getSpendingByDoctor/${clinicID}`).then(d => d.json()).then(updateSpending) }, [clinicID])
  const nameAmountPairs = Object.values(spending)
  return nameAmountPairs.length ? <>
    In the last year your total spending by provider at this clinic has been:
      {nameAmountPairs.map(({ amount, name, ...rest }) => <div key={name}>{name}: ${amount}</div>)}
    <h2>Visits to {name} </h2>
    <SelectField label='Choose Visit To See Details'
      onChange={({ target }) => updateVisitID(target.value)}>

      <option value='0'>Choose a Date</option>
      {visits.map(({ providers, amountSpent, date, materials, receipt, _id, ...rest }) =>
        <option key={_id} value={_id}>{new Date(date).toLocaleDateString()}</option>
      )}
    </SelectField>
    <OneVisit visitID={visitID} visits={visits} spending={spending} />
  </> : 'Choose Clinic Or None Found'
}

const OneVisit = ({ visitID, visits, spending }) => {
  console.log(visitID, visits, 'in one visit')
  if (!visitID || visitID === '0') return 'Choose a Date'
  else {
    const relevantVisits = visits.filter(({ _id }) => _id === visitID)
    if (!relevantVisits.length) return "Loading or none found";

    const { amountSpent, providers, materials, receipt } = relevantVisits[0]
    return <>
      <h4>For This Visit</h4>
      <div>
        Amount Spent: {amountSpent}
      </div>
      <div>
        Materials: {materials}
      </div>
      <div> Providers Present:
        {providers.map(providerID => <div key={providerID}>{spending[providerID].name}</div>)}
      </div>
    </>
  }

}


export const Err = ({ children }) => <div style={{ background: 'red' }}>{children}</div>


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
