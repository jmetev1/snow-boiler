import React from 'react';
import { Button } from 'evergreen-ui/commonjs/buttons';
import { url, getMyClinics } from './url';
import { TextInputField } from 'evergreen-ui';
import { SelectField } from 'evergreen-ui/commonjs/select';
import random from 'random-name'
import { SelectClinic } from './Fields';

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
      this.setState({ type: this.providerTypes[rando(4)], allMyClinics: r, clinic: r[rando(r.length)]._id }
        // , this.submit
      )
    })
  }
  addValue(key, val) {
    const newState = {};
    newState[key] = val.target.value
    this.setState(newState)
  }
  Input = ({ id, desc }) => (<TextInputField
    required
    description={desc}
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
  render() {
    return (<>
      {/* {Object.entries(this.state).map(([key, value]) => (key !== 'allMyClinics') &&
        <div key={key}>{key} is {value}</div>
      )} */}
      < this.SelectClinic />
      <this.Input id='name' desc="Provider Name" />
      <this.SelectType />
      <button onClick={this.submit}>Submit</button>
    </>)
  }
}

export { AddProvider }
