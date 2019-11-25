import React from 'react';
import { url } from './url';
import { Wrapper, SelectClinic, addValue, OneClinic } from './Fields';
import { r } from './data';

export class PastVisits extends React.Component {
  constructor() {
    super();
    this.state = {}
    this.SelectClinic = SelectClinic.bind(this)
    this.addValue = addValue.bind(this)
  }
  componentDidMount() {
    fetch(url + 'clinic').then(d => d.json()).then(allMyClinics => {
      this.setState({ allMyClinics }, () => {
        console.log(16, allMyClinics)
        this.clinicIdToName = allMyClinics.reduce((a, { name, _id }) => {
          a[_id] = name;
          return a
        }, {})
        // this.setState({ clinic: r(allMyClinics)._id })
      })
    })
    fetch(url + 'visits').then(d => d.json()).then(allVisits => {
      this.setState({ allVisits }, () => {
        const byClinic = allVisits.reduce((a, v) => {
          const { clinic } = v;
          a[clinic] = a[clinic] ? a[clinic].concat([v]) : [v]
          return a
        }, {})
        this.setState({ byClinic })
      })
    })
    fetch(url + 'getproviders').then(d => d.json())
      .then(providersById => this.setState({ providersById }))
  }

  render() {
    const { allVisits, clinic, byClinic = {} } = this.state;
    console.log(this.state)
    console.log(this.clinicIdToName)
    return (
      <Wrapper>
        {allVisits ? <>
          <this.SelectClinic />
          <OneClinic clinicID={clinic} visits={byClinic[clinic]} name={this.clinicIdToName[clinic]} />
        </> : "Loading"}
      </Wrapper>
    );
  }
}
