function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "/web_modules/react.js";
import { url, getMyClinics, automatic } from "./url.js";
import random from "./random-name";
import { SelectClinic, DevInfo, SubmitButton, MySelectField, MyTextInputField } from "./Fields";
const {
  prefill
} = window.pglOptions;
export default class AddProvider extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      name: prefill ? random.first() + ' ' + random.last() : '',
      clinic: null,
      type: prefill ? 'MD' : '',
      allMyClinics: []
    });

    _defineProperty(this, "providerTypes", ['MD', 'PA', 'NP', 'MSN']);

    _defineProperty(this, "SubmitButton", SubmitButton.bind(this));

    _defineProperty(this, "submit", () => {
      const copy = { ...this.state
      };
      delete copy.allMyClinics;
      fetch(url + 'provider', {
        method: 'POST',
        body: JSON.stringify(copy),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json());
    });

    _defineProperty(this, "Input", ({
      id,
      label
    }) => React.createElement(MyTextInputField, {
      required: true,
      label: label,
      value: this.state[id],
      onChange: this.addValue.bind(this, id)
    }));

    _defineProperty(this, "SelectType", () => React.createElement(MySelectField, {
      label: "Provider Type",
      defaultValue: "MD",
      onChange: event => this.addValue('type', event)
    }, this.providerTypes.map(type => React.createElement("option", {
      key: type,
      value: type
    }, type))));

    _defineProperty(this, "See", () => React.createElement(DevInfo, null, Object.entries(this.state).map(([key, value]) => key !== 'allMyClinics' && React.createElement("div", {
      key: key
    }, key, " is ", value))));
  }

  componentDidMount() {
    getMyClinics().then(r => {
      const rando = a => Math.floor(Math.random() * a);

      const newState = {
        allMyClinics: r
      };

      if (prefill) {
        newState.type = this.providerTypes[rando(4)];
        newState.clinic = r[rando(r.length)]._id;
      }

      this.setState(newState, automatic ? this.submit : () => {});
    });
  }

  addValue(key, val) {
    const newState = {};
    newState[key] = val.target.value;
    this.setState(newState);
  }

  render() {
    const {
      allMyClinics
    } = this.state;
    return React.createElement(React.Fragment, null, React.createElement(this.See, null), React.createElement(SelectClinic, {
      clinics: allMyClinics,
      setClinic: this.addValue.bind(this, 'clinic')
    }), React.createElement(this.Input, {
      id: "name",
      label: "Provider Name"
    }), React.createElement(this.SelectType, null), React.createElement(this.SubmitButton, null));
  }

}