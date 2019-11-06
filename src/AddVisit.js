/*eslint-disable no-unused-vars*/
import React from 'react';
import { TextInputField, } from 'evergreen-ui';
import { url, getMyClinics, automatic } from './url';
import { firstState, reasons } from './data';
import { Select } from 'evergreen-ui/commonjs/select';
import { SelectClinic, SelectProvider, Wrapper, SubmitButton, DevInfo } from './Fields';

class AddVisit extends React.Component {
  constructor() {
    super();
    this.state = firstState()
    this.SelectClinic = SelectClinic.bind(this)
    this.SelectProvider = SelectProvider.bind(this)
    this.SubmitButton = SubmitButton.bind(this);
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
    toSubmit.providers = Object.entries(this.state.providerOptionsAtOneClinic)
      .reduce((a, [key, value]) => {
        console.log(28, value);
        if (value.chosen === true) a.push(key)
        return a
      }, [])
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
    console.log('addvalue', key, value)
    this.setState(newState, (automatic ? this.submit : () => { }))
  }
  Date = () => {
    return <>
      <TextInputField
        required
        label="Date"
        onChange={this.addValue.bind(this, 'date')}
        type="datetime-local" id="start"
        step="60"
      />
    </>
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
  See = () => <DevInfo>
    {Object.entries(this.state).map(([key, value]) => {
      switch (key) {
        case 'date': value = JSON.stringify(value)
        case 'providerOptionsAtOneClinic': value = JSON.stringify(value)
      }
      return (
        <div key={key}>{key} is {typeof value === "string" ? value :
          value ? 'too much info' : 'not chosen'}</div>
      )
    })}
  </DevInfo>
  render() {
    const { providerOptionsAtOneClinic } = this.state;
    return (
      <>
        <this.See />
        <this.SelectClinic />
        <this.SelectProvider providers={providerOptionsAtOneClinic} />
        <this.Date />
        <this.Reason />
        <this.AmountSpent />
        <this.SubmitButton />
      </>
    );
  }
}

export { AddVisit };