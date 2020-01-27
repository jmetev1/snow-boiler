function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState } from "/web_modules/react.js";
import { url } from "./url.js";
import { Wrapper, SelectClinic, Receipt } from "./Fields";
import { OneClinic } from "./OneClinic";
export default class PastVisits extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});
  }

  componentDidMount() {
    Promise.all(['visits', 'clinic'].map(type => fetch(url + type))).then(res => Promise.all(res.map(r => r.json()))).then(([allVisits, clinics]) => {
      const byClinic = allVisits.reduce((a, v) => {
        const {
          clinic
        } = v;
        a[clinic] = a[clinic] ? a[clinic].concat([v]) : [v];
        return a;
      }, {});
      const clinicsThatHaveVisits = clinics.filter(({
        _id
      }) => byClinic[_id]?.length);
      this.setState({
        clinicsThatHaveVisits,
        byClinic
      });
    });
  }

  render() {
    const {
      clinicsThatHaveVisits,
      byClinic
    } = this.state;
    return React.createElement(Wrapper, null, byClinic ? React.createElement(SelectClinicModule, {
      byClinic: byClinic,
      clinics: clinicsThatHaveVisits
    }) : 'Loading');
  }

}

const SelectClinicModule = ({
  clinics,
  byClinic
}) => {
  const [clinic, setClinic] = useState({});

  const setClinicByID = ({
    target: {
      value
    }
  }) => {
    const chosen = clinics.find(c => value === c._id) || {};
    setClinic(chosen);
  };

  const {
    _id,
    name
  } = clinic;
  const visits = byClinic[_id];
  return React.createElement(React.Fragment, null, React.createElement(SelectClinic, {
    clinics: clinics,
    setClinic: setClinicByID
  }), _id && React.createElement(OneClinic, {
    clinicID: _id,
    clinicName: name,
    visits: visits
  }));
};
/*
get spending by docotr seems to fail with admin
*/