import React from 'react';
import { Button } from 'evergreen-ui/commonjs/buttons';
import { url, getMyClinics, automatic } from './url';
import { TextInputField } from 'evergreen-ui';
import { SelectField } from 'evergreen-ui/commonjs/select';
import random from 'random-name'
import { SelectClinic, DevInfo, SubmitButton } from './Fields';

class AddProvider extends React.Component {
  constructor() {
    super()
    this.state = {
      name: random.first() + ' ' + random.last(),
      clinic: '',
      type: 'MD',
    }
    this.providerTypes = ['MD', "PA", "NP", "MSN"];
    this.SelectClinic = SelectClinic.bind(this)
    this.SubmitButton = SubmitButton.bind(this);
  }
  submit = () => {
    const copy = { ...this.state }
    delete copy.allMyClinics
    fetch(url + 'provider', {
      method: "POST",
      body: JSON.stringify(copy),
      headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json()).then(r => { })
  }
  componentDidMount() {
    getMyClinics().then(r => {
      const rando = a => Math.floor(Math.random() * a)
      this.setState({ type: this.providerTypes[rando(4)], allMyClinics: r, clinic: r[rando(r.length)]._id }, (automatic ? this.submit : () => { })
      )
    })
  }
  addValue(key, val) {
    const newState = {};
    newState[key] = val.target.value
    this.setState(newState)
  }
  Input = ({ id, label }) => (<TextInputField
    required
    label={label}
    value={this.state[id]}
    onChange={this.addValue.bind(this, id)}
  />)
  SelectType = () => <SelectField
    label="Provider Type"
    defaultValue="MD"
    onChange={event => this.addValue('type', event)}
  >
    {this.providerTypes.map(type =>
      <option key={type} value={type}>{type}</option>
    )}
  </SelectField>
  See = () => <DevInfo>
    {Object.entries(this.state).map(([key, value]) => (key !== 'allMyClinics') &&
      <div key={key}>{key} is {value}</div>)}
  </DevInfo>
  render() {
    return (<>
      <this.See />
      <this.SelectClinic />
      <this.Input id='name' label="Provider Name" />
      <this.SelectType />
      <this.SubmitButton />
    </>)
  }
}

export { AddProvider }
