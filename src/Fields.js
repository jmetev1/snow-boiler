import React from 'react';
import {
  Pane, Button, SelectField, TextInputField,
} from 'evergreen-ui';
import { Checkbox } from 'evergreen-ui/commonjs/checkbox';

export const SelectClinic = function () {
  return this.state.allMyClinics ?
    <SelectField
      label="Choose a Clinic"
      onChange={event => this.addValue('clinic', event)}
    >
      {this.state.allMyClinics.map(({ _id, name }) =>
        <option key={_id} value={_id}>{name}</option>
      )}
    </SelectField> : 'loading Clinics'
}
export const SelectProvider = function ({ providers }) {
  return providers ?
    <Wrapper>
      {Object.values(providers).map(({ _id, name, chosen }) => <Checkbox
        key={_id}
        label={name}
        checked={chosen}
        onChange={() => {
          providers[_id].chosen = !chosen
          this.setState({ providerOptionsAtOneClinic: providers })
        }}
      />)}
    </Wrapper> : 'Loading Providers'
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
