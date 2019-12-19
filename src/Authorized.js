import React from "react";
import { AddVisit } from "./AddVisit";
import { AddProvider } from "./AddProvider";
import { Button, Pane } from "evergreen-ui";
import "./App.css";
import { AddClinic } from "./AddClinic";
import { PastVisits } from "./PastVisits";
import { url } from "./url";

export class Authorized extends React.Component {
  constructor() {
    super();
    this.state = {
      // show: AddProvider
      show: AddVisit
      // show: AddClinic
      // show: PastVisits
    };
  }
  logout() {
    fetch(url + "logout").then(() => location.reload()); //eslint-disable-line
  }
  Header = () => {
    const links = {
      "Past Visits": PastVisits,
      "Add Clinic": AddClinic,
      "Add Provider": AddProvider,
      "Add Visit": AddVisit
    };
    const MyButton = props => (
      <Button style={{ flex: "1 1 33%" }} height="36" {...props} />
    );
    const style = { margin: "auto" };
    return (
      <nav style={{ display: "flex", flexWrap: "wrap" }}>
        <MyButton
          key="logout"
          onClick={this.logout}
          children={<span style={style}>Logout</span>}
        />
        {Object.entries(links).map(([label, component]) => (
          <MyButton
            key={label}
            appearance={component === this.state.show ? "primary" : "default"}
            onClick={() => this.setState({ show: component })}
          >
            <span style={style}>{label}</span>
          </MyButton>
        ))}
      </nav>
    );
  };

  render() {
    return (
      <>
        <this.Header />
        {typeof this.state.show === "function" ? (
          <Pane
            paddingTop={15}
            paddingBottom={100}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Pane width="90vw" border="default">
              <this.state.show />
            </Pane>
          </Pane>
        ) : (
          <div>you broke authorized.js</div>
        )}
      </>
    );
  }
}
