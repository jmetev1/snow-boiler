import React from "react";
import { Button } from "evergreen-ui/commonjs/buttons";
import { url, automatic } from "./url";
import random from "random-name";
import { SubmitButton, DevInfo, MyTextInputField } from "./Fields";

export class AddClinic extends React.Component {
  constructor() {
    super();
    this.state = {
      name: random.last() + " Clinic",
      address: "100 " + random.middle() + " St."
    };
    this.SubmitButton = SubmitButton.bind(this);
  }
  submit = () => {
    fetch(url + "clinic", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: { "Content-Type": "application/json" }
    }).then(r => r.json());
  };
  componentDidMount() {
    if (automatic) this.submit();
  }
  addValue(key, val) {
    const newState = {};
    newState[key] = val.target.value;
    this.setState(newState);
  }
  Input = ({ id, label }) => (
    <MyTextInputField
      label={label}
      required
      value={this.state[id]}
      onChange={this.addValue.bind(this, id)}
    />
  );
  See = () => (
    <DevInfo>
      {Object.entries(this.state).map(([key, value]) => (
        <div key={key}>
          {key} is {value}
        </div>
      ))}
    </DevInfo>
  );
  render() {
    return (
      <>
        <this.See />
        <this.Input id="name" label="Clinic Name" />
        <this.Input id="address" label="Clinic Address" />
        <this.SubmitButton />
      </>
    );
  }
}
