import React from 'react';
import { History } from './History';
import { AddVisit } from './AddVisit';
import { AddProvider } from './AddProvider';
import { Button } from 'evergreen-ui/commonjs/buttons';
import './App.css'
import { AddClinic } from './AddClinic';
import { Pane } from 'evergreen-ui';

class Authorized extends React.Component {
  constructor() {
    super()
    this.state = {
      // show: AddProvider
      show: AddVisit
      // show: AddClinic
      // show: History
    }
  }
  Header = () => {
    const links = {
      'Add Visit': AddVisit,
      'Past Visits': History,
      'Add Provider': AddProvider,
      'Add Clinic': AddClinic
    }
    return (
      <nav>
        {Object.entries(links).map(([label, component]) =>
          <Button key={label} height="32" appearance={component === this.state.show ? 'primary' : "minimal"} onClick={() => this.setState({ show: component })}>
            {label}
          </Button>
        )}
      </nav>
    )
  }
  render() {
    return (<>
      <this.Header />
      {typeof this.state.show === 'function' ? (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Pane
            width="90vw"
            border="default"
          >
            <this.state.show />
          </Pane>
        </Pane>
      ) : <div>you broke authorized.js</div>}
    </>
    )
  }
}

export default Authorized


