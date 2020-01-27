function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "/web_modules/react.js";
import random from "./random-name";
import { url, automatic } from "./url.js";
import { SubmitButton, DevInfo, MyTextInputField } from "./Fields";
import { Link } from "/web_modules/react-router-dom.js";
const {
  prefill
} = window.pglOptions;
export default class AddClinic extends React.Component {
  constructor() {
    super();

    _defineProperty(this, "submit", () => {
      fetch(`${url}clinic`, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json());
    });

    _defineProperty(this, "Input", ({
      id,
      label
    }) => React.createElement(MyTextInputField, {
      label: label,
      required: true,
      value: this.state[id],
      onChange: this.addValue.bind(this, id)
    }));

    _defineProperty(this, "See", () => React.createElement(DevInfo, null, Object.entries(this.state).map(([key, value]) => React.createElement("div", {
      key: key
    }, key, " is ", value))));

    this.state = {
      name: prefill ? `${random.last()} Clinic` : '',
      address: prefill ? '100 ' + random.middle() + ' St.' : ''
    };
    this.SubmitButton = SubmitButton.bind(this);
  }

  componentDidMount() {
    if (automatic) this.submit();
  }

  addValue(key, val) {
    const newState = {};
    newState[key] = val.target.value;
    this.setState(newState);
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement(this.See, null), React.createElement(this.Input, {
      id: "name",
      label: "Clinic Name"
    }), React.createElement(this.Input, {
      id: "address",
      label: "Clinic Address"
    }), React.createElement(this.SubmitButton, {
      link: React.createElement(Link, {
        to: "/addprovider"
      }, "Click Here To Add A Provider")
    }));
  }

}