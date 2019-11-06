import React from 'react';
import { Button } from 'evergreen-ui/commonjs/buttons';
import { url, automatic } from './url';
import { TextInputField } from 'evergreen-ui';
import { SelectField } from 'evergreen-ui/commonjs/select';
import random from 'random-name'
import { SubmitButton, DevInfo } from './Fields';

class AddClinic extends React.Component {
  constructor() {
    super()
    this.state = {
      name: random.last() + ' Clinic',
      address: '100 ' + random.middle() + ' St.'
    }
    this.SubmitButton = SubmitButton.bind(this);
  }
  submit = () => {
    console.log(17)
    fetch(url + 'clinic', {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' }
    }).then(r => {
      console.log(23, r)
      r.json()
    }).then(r => {
      console.log('add clinic', r)
    })
  }
  componentDidMount() {
    if (automatic) this.submit();
  }
  addValue(key, val) {
    const newState = {};
    newState[key] = val.target.value
    this.setState(newState)
  }
  Input = ({ id, desc }) => {
    return (<TextInputField
      // label="A controlled text input field"
      required
      description={desc}
      value={this.state[id]}
      onChange={this.addValue.bind(this, id)}
    />)
  }
  See = () => <DevInfo>
    {Object.entries(this.state).map(([key, value]) => (
      <div key={key}>{key} is {value}</div>
    ))}
  </DevInfo>
  render() {
    return (<>
      <this.See />
      <this.Input id='name' desc="Clinic Name" />
      <this.Input id='address' desc="Clinic Address" />
      <this.SubmitButton />
    </>)
  }
}

export { AddClinic }
