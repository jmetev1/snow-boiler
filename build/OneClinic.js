import React, { useState, useEffect } from "/web_modules/react.js";
import { url } from "./url.js";
import { MySelectField, OneVisit } from "./Fields";
export const OneClinic = ({
  clinicID,
  visits = [],
  clinicName
}) => {
  const [spending, updateSpending] = useState({});
  const [visit, updateVisit] = useState({});

  const updateVisitByID = ({
    target: {
      value
    }
  }) => updateVisit(visits.find(({
    _id
  }) => _id === value));

  useEffect(() => updateVisit({}), [clinicID]);
  useEffect(() => {
    fetch(`${url}getSpendingByDoctor/${clinicID}`).then(d => d.json()).then(updateSpending); // .then(a => updateVisitByID("5ddc8639e8705d24251d60c3"));
  }, [clinicID]);
  const nameAmountPairs = Object.values(spending).sort(({
    amount
  }, b) => b.amount - amount);
  if (nameAmountPairs.length) return React.createElement(React.Fragment, null, "In the last year at ", clinicName, " you have spent these amounts. (Highest to lowest)", React.createElement("ol", null, nameAmountPairs.map(({
    amount,
    name: drName
  }) => React.createElement("li", {
    key: drName
  }, drName, ": $", amount.toFixed(2)))), React.createElement("h2", null, "Visits to ", clinicName, " by date "), React.createElement(MySelectField, {
    label: "Choose Visit To See Details",
    onChange: updateVisitByID
  }, React.createElement("option", {
    value: "0"
  }, "Choose a Date"), visits?.map(({
    date,
    _id
  }) => React.createElement("option", {
    key: _id,
    value: _id
  }, new Date(date).toLocaleDateString()))), React.createElement(OneVisit, {
    visit: visit,
    spending: spending
  }));
  if (!clinicID) return 'Choose a clinic';
  return 'No spending found for this clinic this year';
};