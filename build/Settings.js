import React from "/web_modules/react.js";
import { Pane, Switch, Label } from "/web_modules/evergreen-ui.js";
import "./App.css";
export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = { ...window.pglOptions,
      updateOptions: (key, {
        target: {
          checked
        }
      }) => {
        window.pglOptions[key] = localStorage[key] = checked;
        this.setState(Object.fromEntries([[key, checked]]));
      }
    };
  }

  render() {
    const {
      updateOptions,
      ...rest
    } = this.state;
    const {
      user
    } = this.props;
    const height = 28;
    return React.createElement(Pane, null, React.createElement("div", null, "Current User is ", user), Object.entries(rest).map(([key, value]) => React.createElement(Label, {
      key: key,
      height: height
    }, key, React.createElement(Switch, {
      height: height,
      checked: value,
      onChange: updateOptions.bind(null, key)
    }))));
  }

}