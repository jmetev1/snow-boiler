import React from 'react';
import { Pane, Switch, Label } from 'evergreen-ui';
import './App.css';

const dev = process.env.NODE_ENV === 'development';

for (let [key, value] of Object.entries({
  dev,
  validate: true,
  prefill: false,
  showState: dev,
  settings: true,
})) {
  if (window.pglOptions[key] === undefined) window.pglOptions[key] = value;
}

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      ...window.pglOptions,
      updateOptions: (key, { target: { checked } }) => {
        window.pglOptions[key] = checked;
        this.setState(Object.fromEntries([[key, checked]]));
      },
    };
  }
  render() {
    const { updateOptions, ...rest } = this.state;
    const { user } = this.props;
    const height = 28;

    return (
      <Pane>
        <div>Current User is {user}</div>
        {Object.entries(rest).map(([key, value]) => {
          return (
            <Label key={key} height={height}>
              {key}
              <Switch
                height={height}
                checked={value}
                onChange={updateOptions.bind(null, key)}
              />
            </Label>
          );
        })}
      </Pane>
    );
  }
}
