import React from 'react';
import { Button } from 'evergreen-ui/commonjs/buttons';
import { url } from './url';
import { TextInputField } from 'evergreen-ui';
import { SelectField } from 'evergreen-ui/commonjs/select';
import random from 'random-name'

class AddClinic extends React.Component {
  constructor() {
    super()
    this.state = {
      name: random.last() + ' Clinic',
      address: '100 ' + random.middle() + ' St.'
    }
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
    this.submit();
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
  render() {
    return (<>
      {/* {Object.entries(this.state).map(([key, value]) => (
        <div key={key}>{key} is {value}</div>
      ))} */}
      <this.Input id='name' desc="Clinic Name" />
      <this.Input id='address' desc="Clinic Address" />
      <Button height="32" appearance="primary" onClick={this.submit}>
        Submit
      </Button>

    </>)
  }
}

export { AddClinic }
