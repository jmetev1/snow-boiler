import React from 'react';
import { Pane, Switch, Label } from 'evergreen-ui';
import './App.css';
import { OptionsContext } from './App';

const Settings = () => (
  <OptionsContext.Consumer>
    {({ updateOptions, region, ...rest }) => {
      const height = 28;
      return (
        <Pane>
          <div>Current User is {region}</div>
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
    }}
  </OptionsContext.Consumer>
);

export { Settings };
