/*eslint-disable no-unused-vars*/
import React from 'react';
import { Pane, Button, TextInputField, } from 'evergreen-ui';
import { url, getMyClinics } from './url';
import { providers, firstState, reasons, clinics, r } from './data';
import { Select } from 'evergreen-ui/commonjs/select';
import { Provider, SelectClinic, SelectProvider, Wrapper } from './Fields';
import { thisExpression } from '@babel/types';

class AddVisit extends React.Component {
  constructor() {
    super();
    this.state = firstState()
    this.SelectClinic = SelectClinic.bind(this)
    this.SelectProvider = SelectProvider.bind(this)
  }
  componentDidMount() {
    getMyClinics().then(r => this.setState({ allMyClinics: r, clinic: r[0] }));
    this.getAllProviders()
  }
  submit = async () => {
    Object.entries(this.state).forEach(([key, value]) =>
      console.log('in state', key, value))
    const toSubmit = ['amountSpent', 'date', 'reason', 'materials', 'receipt', 'clinic'].reduce((a, key) => {
      a[key] = this.state[key]
      return a;
    }, {})
    toSubmit.providers = Object.keys(this.state.providerOptionsAtOneClinic)
    Object.entries(toSubmit).forEach(([key, value]) =>
      console.log('to submit', key, value)
    )
    await fetch(url + 'visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toSubmit)
    }).then(res => {
      if (!res.ok) throw new Error('error posting');
    })
  }
  async getAllProviders() {
    const providersByClinic = await fetch(url + 'getproviders', { method: 'GET' }).then(r => r.json())
    this.setState({ providersByClinic }, () => {
      const keys = Object.keys(providersByClinic)
      const rando = Math.floor(Math.random() * keys.length);
      this.addValue('clinic', {
        target: { value: keys[rando] }
      })
    })
  }
  addValue(key, event) {
    const newState = {};
    const { value } = event.target
    console.log(key, value)
    newState[key] = value
    if (key === 'clinic') {
      console.log(key, value)
      const providerOptionsAtOneClinic = this.state.providersByClinic[value] || [];
      newState.providerOptionsAtOneClinic = providerOptionsAtOneClinic.reduce((a, provider) => {
        provider.chosen = Math.random() > .5;
        a[provider._id] = provider;
        return a;
      }, {})
    }
    this.setState(newState,
      this.submit
    )
  }
  Date = () => {
    console.log(70, this.state.date)
    return <TextInputField
      required
      label="Date"
      value={this.state.date}
      // onChange={this.addValue.bind(this, 'date')}
      type="date" id="start" />
  }
  AmountSpent = () =>
    <TextInputField
      label="Amount Spent"
      required
      // description=""
      value={this.state.amountSpent}
      onChange={this.addValue.bind(this, 'amountSpent')}
    />
  Reason = () =>
    <Select defaultValue="all" onChange={({ target: { value } }) => this.setState({ reason: value })}>
      {reasons.map(n => <option value={n} key={n}>{n}</option>)}
    </Select>
  See = () => {
    return Object.entries(this.state).map(([key, value]) => {
      switch (key) {
        case 'date': value = JSON.stringify(value)
      }
      return (
        <div key={key}>{key} is {typeof value === "string" ? value :
          value ? 'too much info' : 'not chosen'}</div>
      )

    }
      // value && JSON.stringify(value)}</div>
    )
  }
  render() {
    const { providerOptionsAtOneClinic } = this.state;
    return (
      <>
        {/* <this.See /> */}
        <this.SelectClinic />
        <this.SelectProvider providers={providerOptionsAtOneClinic} />
        <this.Date />
        <this.Reason />
        <this.AmountSpent />
        <Button onClick={this.submit} appearance="primary">Submit</Button>
      </>
    );
  }
}

export { AddVisit };