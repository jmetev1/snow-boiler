import React, { useState } from 'react';
import { url } from './url';
import { Wrapper, SelectClinic, MySelectField } from './Fields';
import { OneClinic } from './OneClinic';

export class PastVisits extends React.Component {
  state = {};
  componentDidMount() {
    fetch(url + 'clinic')
      .then(d => d.json())
      .then(allMyClinics => {
        this.setState({ allMyClinics }, () => {
          if (process.env.NODE_ENV === 'development')
            this.setState({ clinic: '5dc33f20acaf6659567af212' });
        });
      });
    fetch(url + 'visits')
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
  }

  render() {
    const { allMyClinics, byClinic } = this.state;
    return (
      <Wrapper>
        {byClinic ? (
          <SelectClinicModule byClinic={byClinic} clinics={allMyClinics} />
        ) : (
          'Loading'
        )}
      </Wrapper>
    );
  }
}

const SelectClinicModule = ({ clinics, byClinic }) => {
  const [clinic, setClinic] = useState({});

  const setClinicByID = ({ target: { value } }) => {
    const chosen = clinics.find(c => value === c._id) || {};
    setClinic(chosen);
  };
  const { _id, name } = clinic;
  const visits = byClinic[_id];
  return (
    <>
      <SelectClinic clinics={clinics} setClinic={setClinicByID} />
      {_id && (
        <OneClinic clinicID={_id} clinicName={name} visits={visits}></OneClinic>
      )}
    </>
  );
};
