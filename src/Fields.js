import React, { useState, useEffect } from "react";
import {
  Pane,
  Button,
  SelectField,
  TextInputField,
  Textarea
} from "evergreen-ui";
import { showState, url } from "./url";

const height = 48;

export const MySelectField = props => (
  <SelectField {...props} inputHeight={height} />
);
export const MyTextarea = props => (
  <Textarea {...props} style={{ fontSize: "16px" }} />
);

export const MyTextInputField = props => (
  <TextInputField {...props} inputHeight={height} />
);

export const SelectClinic = ({ clinics = [], setClinic }) => {
  return (
    <MySelectField label="Choose a Clinic" onChange={setClinic}>
      {[{ _id: 0, name: "Choose A Clinic" }, ...clinics].map(
        ({ _id, name }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        )
      )}
    </MySelectField>
  );
};

export const Wrapper = ({ children }) => (
  <Pane display="flex" padding={6} background="tint2" borderRadius={3}>
    <Pane flex={1} alignItems="center">
      {children}
    </Pane>
  </Pane>
);

export const SubmitButton = function() {
  const doIt = () => {
    this.setState({ submitted: false, waiting: true }, async () => {
      await this.submit();
      this.setState({ submitted: true });
    });
  };
  const reload = () => location.reload(); //eslint-disable-line
  const { submitted, waiting } = this.state;
  if (waiting && !submitted) return "Submitting Data";
  return submitted ? (
    <div>
      'Successfully Submitted'
      <button onClick={reload}>Add Another</button>
    </div>
  ) : (
    <Button onClick={doIt} appearance="primary" children="Submit" />
  );
};

export const DevInfo = ({ children }) => (showState ? <>{children}</> : null);

export const addValue = function(key, event) {
  console.log(event, event.target);
  const newState = {};
  const { value } = event.target;
  newState[key] = value;
  this.setState(newState);
};

export const OneVisit = ({ visit = {}, spending }) => {
  if (!visit._id) return "Choose a Date";

  const { amountSpent, providers, materials, receiptID } = visit;

  return (
    <>
      <h4>For This Visit</h4>
      <div>Amount Spent: ${amountSpent}</div>
      <div>Materials:{materials.length ? materials.join(" ") : "None"}</div>
      <div>
        Providers Present:
        <ol>
          {providers.map(providerID => {
            if (!spending[providerID]) debugger;
            return <li key={providerID}>{spending[providerID].name}</li>;
          })}
        </ol>
      </div>
      <div style={{ display: "flex", height: "350px" }}>
        {receiptID && receiptID.length ? (
          <div style={{ margin: "auto", transform: "rotate(90deg)" }}>
            <img
              height="250px"
              src={`${url}receipt/${receiptID}`}
              alt="receipt"
            />
          </div>
        ) : (
          "No image was uploaded"
        )}
      </div>
    </>
  );
};

export const Err = ({ children }) => (
  <div style={{ background: "red" }}>{children}</div>
);
/*eslint-disable no-unused-expressions*/
export const compress = (e, cb) => {
  e.persist();
  // const width = 300;
  const width = Number(document.getElementById("receipt-width").value);
  console.log(118, process.env);
  console.log(119, width, typeof width);
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  console.log(172, e.target.files[0].size / 1000);
  reader.onload = event => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const elem = document.createElement("canvas");
      elem.width = width;
      elem.height = img.height * (width / img.width);
      const ctx = elem.getContext("2d");
      // img.width and img.height will contain the original dimensions
      ctx.drawImage(img, 0, 0, width, elem.height);
      ctx.canvas.toBlob(
        blob => {
          const file = new File([blob], e.target.files[0].name, {
            type: "image/jpeg",
            lastModified: Date.now()
          });
          cb(file);
        },
        "image/jpeg",
        1
      );
    };
    reader.onerror = error => console.log(error);
  };
};

// export const SelectProvider = function ({ providers }) {
//   return providers ?
//     <Wrapper>
//       Choose Providers Present
//       {Object.values(providers).map(({ _id, name, chosen }) => <Checkbox
//         key={_id}
//         label={name}
//         checked={chosen}
//         onChange={() => {
//           providers[_id].chosen = !chosen
//           this.setState({ providerOptionsAtOneClinic: providers })
//         }}
//       />)}
//     </Wrapper> : 'Loading Providers'
// }
