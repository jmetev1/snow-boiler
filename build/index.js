import React, { Suspense } from "/web_modules/react.js";
import ReactDOM from "/web_modules/react-dom.js";
import { Pretty } from "../build/Fields.js";
import AddVisit from "../build/AddVisit.js";
import Home from "./Home.js";
ReactDOM.render(React.createElement(Pretty, null, React.createElement(Home, null)), document.getElementById('root'));