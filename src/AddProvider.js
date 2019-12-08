import React from "react";

import { url, getMyClinics, automatic } from "./url";
import { Button, SelectField } from "evergreen-ui";
import random from "random-name";
import {
  SelectClinic,
  DevInfo,
  SubmitButton,
  MySelectField,
  MyTextInputField
} from "./Fields";

export class AddProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      name: random.first() + " " + random.last(),
      clinic: "",
      type: "MD"
    };
    this.providerTypes = ["MD", "PA", "NP", "MSN"];
    this.SelectClinic = SelectClinic.bind(this);
    this.SubmitButton = SubmitButton.bind(this);
  }
  submit = () => {
    const copy = { ...this.state };
    delete copy.allMyClinics;
    fetch(url + "provider", {
      method: "POST",
      body: JSON.stringify(copy),
      headers: { "Content-Type": "application/json" }
    }).then(r => r.json());
  };
  componentDidMount() {
    getMyClinics().then(r => {
      const rando = a => Math.floor(Math.random() * a);
      this.setState(
        {
          type: this.providerTypes[rando(4)],
          allMyClinics: r,
          clinic: r[rando(r.length)]._id
        },
        automatic ? this.submit : () => {}
      );
    });
  }
  addValue(key, val) {
    const newState = {};
    newState[key] = val.target.value;
    this.setState(newState);
  }
  Input = ({ id, label }) => (
    <MyTextInputField
      required
      label={label}
      value={this.state[id]}
      onChange={this.addValue.bind(this, id)}
    />
  );
  SelectType = () => (
    <MySelectField
      label="Provider Type"
      defaultValue="MD"
      onChange={event => this.addValue("type", event)}
    >
      {this.providerTypes.map(type => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </MySelectField>
  );
  See = () => (
    <DevInfo>
      {Object.entries(this.state).map(
        ([key, value]) =>
          key !== "allMyClinics" && (
            <div key={key}>
              {key} is {value}
            </div>
          )
      )}
    </DevInfo>
  );
  render() {
    return (
      <>
        <this.See />
        <this.SelectClinic />
        <this.Input id="name" label="Provider Name" />
        <this.SelectType />
        <this.SubmitButton />
      </>
    );
  }
}
