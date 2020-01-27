import React from "/web_modules/react.js";
import ReactDOM from "./web_modules/react-dom.js";
import App from "./App";
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement(App, null), div);
  ReactDOM.unmountComponentAtNode(div);
});