import React, { useState, useEffect } from "react";
import { showState, url } from "./url";
import { MySelectField, OneVisit } from "./Fields";

export const OneClinic = ({ clinicID, visits = [], clinicName }) => {
  const [spending, updateSpending] = useState({});
  const [visit, updateVisit] = useState({});

  const updateVisitByID = ({ target: { value } }) => {
    const visit = visits.find(({ _id }) => _id === value);
    updateVisit(visit);
  };

  useEffect(() => {
    fetch(`${url}getSpendingByDoctor/${clinicID}`)
      .then(d => d.json())
      .then(updateSpending);
    // .then(a => updateVisitByID("5ddc8639e8705d24251d60c3"));
  }, [clinicID]);
  const nameAmountPairs = Object.values(spending);

  return nameAmountPairs.length ? (
    <>
      In the last year your total spending by provider at this clinic has been:
      {nameAmountPairs.map(({ amount, name: drName, ...rest }) => (
        <div key={drName}>
          {drName}: ${amount}
        </div>
      ))}
      <h2>Visits to {clinicName} </h2>
      <MySelectField
        label="Choose Visit To See Details"
        onChange={updateVisitByID}
      >
        <option value="0">Choose a Date</option>
        {visits &&
          visits.map(({ date, _id }) => (
            <option key={_id} value={_id}>
              {new Date(date).toLocaleDateString()}
            </option>
          ))}
      </MySelectField>
      <OneVisit visit={visit} spending={spending} />
    </>
  ) : (
    "Choose Clinic Or None Found"
  );
};
