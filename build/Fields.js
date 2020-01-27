function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from "/web_modules/react.js"; // import logo from './image/pnglogo.png';

import { Pane, Button, SelectField, TextInputField, Textarea, Spinner } from "/web_modules/evergreen-ui.js";
import { url } from "./url.js";
import { NavLink } from "/web_modules/react-router-dom.js";
const height = 48;
export const MySelectField = props => React.createElement(SelectField, _extends({}, props, {
  inputHeight: height
}));
export const MyTextarea = props => React.createElement(Textarea, _extends({}, props, {
  style: {
    fontSize: '16px'
  }
}));
export const MyTextInputField = props => React.createElement(TextInputField, _extends({}, props, {
  inputHeight: height
}));
export const SelectClinic = ({
  clinics = [],
  setClinic
}) => {
  return React.createElement(MySelectField, {
    label: "Choose a clinic",
    onChange: setClinic
  }, [{
    _id: 0,
    name: 'Choose a clinic'
  }, ...clinics].map(({
    _id,
    name
  }) => React.createElement("option", {
    key: _id,
    value: _id
  }, name)));
};
export const Wrapper = ({
  children
}) => React.createElement(Pane, {
  display: "flex",
  padding: 6,
  background: "tint2",
  borderRadius: 3
}, React.createElement(Pane, {
  flex: 1,
  alignItems: "center"
}, children));
export const SubmitButton = function ({
  link = ''
}) {
  const doIt = () => {
    this.setState({
      submitted: false,
      waiting: true
    }, async () => {
      await this.submit();
      this.setState({
        submitted: true
      });
    });
  };

  const reload = () => location.reload(); //eslint-disable-line


  const {
    submitted,
    waiting
  } = this.state;
  if (waiting && !submitted) return 'Submitting Data';
  return submitted ? React.createElement("div", null, "Successfully Submitted", React.createElement("div", null, link || React.createElement("button", {
    onClick: reload
  }, "Add Another"))) : React.createElement(Button, {
    onClick: doIt,
    appearance: "primary",
    children: "Submit"
  });
};
export const DevInfo = ({
  children
}) => window.pglOptions.showState && React.createElement(React.Fragment, null, children);
export const addValue = function (key, event) {
  const newState = {};
  const {
    value
  } = event.target;
  newState[key] = value;
  this.setState(newState);
};
export const OneVisit = ({
  visit = {},
  spending
}) => {
  if (!visit._id) return 'Choose a Date';
  const {
    amountSpent,
    providers,
    materials,
    receiptID,
    rep
  } = visit;
  return React.createElement(React.Fragment, null, React.createElement("h4", null, "For This Visit"), React.createElement("div", null, "Amount Spent: $", amountSpent), React.createElement("div", null, "Materials: ", materials.length ? materials.join(' ') : 'None'), React.createElement("div", null, "Rep: ", rep, " "), React.createElement("div", null, "Providers Present:", React.createElement("ol", null, providers.map(providerID => {
    if (spending[providerID]) return React.createElement("li", {
      key: providerID
    }, spending[providerID].name);else return 'Loading';
  }))), receiptID && receiptID.length ? React.createElement(Receipt, {
    src: `${url}receipt/${receiptID}`
  }) : 'No image was uploaded');
};
export const Receipt = ({
  src
}) => {
  const [enlarge, setEnlarge] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggle = () => setEnlarge(!enlarge);

  return enlarge ? React.createElement("div", {
    className: "fill-screen-all"
  }, React.createElement("button", {
    onClick: toggle,
    className: "top-right"
  }, "X"), React.createElement("div", {
    onClick: toggle,
    className: "fill-screen"
  }, React.createElement("div", {
    style: {
      transform: 'rotate(90deg)'
    }
  }, React.createElement("img", {
    className: "make-it-fit",
    src: src,
    alt: "receipt",
    onLoad: () => setLoading(false)
  }), loading && React.createElement(Spinner, null)))) : React.createElement(React.Fragment, null, React.createElement("h4", null, "Click To Enlarge"), React.createElement("div", {
    style: {
      display: 'flex',
      height: '350px'
    }
  }, React.createElement("div", {
    style: {
      margin: 'auto',
      transform: 'rotate(90deg)'
    }
  }, React.createElement("div", {
    onClick: toggle
  }, React.createElement("img", {
    height: "250px",
    onLoad: () => setLoading(false),
    src: src,
    alt: "receipt"
  }), loading && React.createElement(Spinner, null)))));
};
export const Err = ({
  children
}) => React.createElement("div", {
  style: {
    background: 'red'
  }
}, children);
/*eslint-disable no-unused-expressions*/

export const compress = (e, cb) => {
  e.persist();
  const width = 1000;
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);

  reader.onload = event => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = width;
      elem.height = img.height * (width / img.width);
      const ctx = elem.getContext('2d'); // img.width and img.height will contain the original dimensions

      ctx.drawImage(img, 0, 0, width, elem.height);
      ctx.canvas.toBlob(blob => {
        const file = new File([blob], e.target.files[0].name, {
          type: 'image/jpeg',
          lastModified: Date.now()
        });
        cb(file);
      }, 'image/jpeg', 1);
    };

    reader.onerror = error => console.log(error);
  };
};
export const Header = ({
  user
}) => {
  const MyButton = props => React.createElement(Button, _extends({
    style: {
      flex: '1 1 33%'
    },
    height: "36"
  }, props));

  const style = {
    margin: 'auto'
  };

  const logout = () => fetch(url + 'logout').then(() => location.reload()); //eslint-disable-line


  return React.createElement("nav", {
    style: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  }, window.pglOptions.dev && React.createElement(MyButton, {
    key: "user",
    children: React.createElement("span", {
      style: style
    }, "user is ", user)
  }), React.createElement(MyButton, {
    key: "logout",
    onClick: logout,
    children: React.createElement("span", {
      style: style
    }, "Logout")
  }), Object.entries(routeNames).filter(([label]) => {
    if (user === 'admin') return label === 'Past Visits';
    return true;
  }).map(([label, [url]]) => {
    if (window.pglOptions.settings !== true && label === 'Settings') return null;else return React.createElement(MyButton, {
      key: label,
      appearance: window.location.href.includes(url) ? 'primary' : 'default'
    }, React.createElement(NavLink, {
      to: `/${url}`,
      style: {
        width: '100%',
        textDecoration: 'none',
        color: 'unset'
      }
    }, React.createElement("span", {
      style: style
    }, label)));
  }));
};
export const Loading = () => React.createElement(Pane, {
  paddingTop: 15,
  paddingBottom: 100,
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}, React.createElement("div", {
  width: "90vw",
  border: "default",
  style: {
    textAlign: 'center'
  }
}, React.createElement("img", {
  src: "../image/pnglogo.png",
  height: "47px",
  alt: "pgl logo"
}), React.createElement("h4", null, "Please wait, loading ")));
export const routeNames = {
  'Past Visits': ['pastvisits'],
  'Add Clinic': ['addclinic'],
  'Add Provider': ['addprovider'],
  'Add Visit': ['addvisit'],
  Settings: ['settings']
};
export const Pretty = ({
  children,
  user
}) => React.createElement(React.Fragment, null, React.createElement(Header, {
  user: user
}), React.createElement(Pane, {
  paddingTop: 15,
  paddingBottom: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}, React.createElement(Pane, {
  width: "90vw",
  border: "default"
}, children)));