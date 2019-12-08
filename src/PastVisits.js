import React from "react";
import { url } from "./url";
import { Wrapper, SelectClinic, addValue, OneClinic } from "./Fields";
import { r } from "./data";
import { Select } from "evergreen-ui";

export class PastVisits extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.SelectClinic = SelectClinic.bind(this);
    this.addValue = addValue.bind(this);
  }
  componentDidMount() {
    fetch(url + "clinic")
      .then(d => d.json())
      .then(allMyClinics => {
        this.setState({ allMyClinics }, () => {
          if (process.env.NODE_ENV === "development")
            this.setState({ clinic: "5dc33f20acaf6659567af212" });
        });
      });
    fetch(url + "visits")
      .then(d => d.json())
      .then(allVisits => {
        this.setState({ allVisits }, () => {
          const byClinic = allVisits.reduce((a, v) => {
            const { clinic } = v;
            a[clinic] = a[clinic] ? a[clinic].concat([v]) : [v];
            return a;
          }, {});
          this.setState({ byClinic });
        });
      });
    fetch(url + "getproviders")
      .then(d => d.json())
      .then(providersById => this.setState({ providersById }));
  }

  render() {
    const { allVisits, clinic, byClinic = {}, chosenClinicName } = this.state;
    console.log(this.state);
    return (
      <Wrapper>
        {allVisits ? (
          <>
            <this.SelectClinic />
            <OneClinic
              clinicID={clinic}
              visits={byClinic[clinic]}
              clinicName={chosenClinicName}
            />
          </>
        ) : (
          "Loading"
        )}
      </Wrapper>
    );
  }
}
