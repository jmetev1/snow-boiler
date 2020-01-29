import React from "/web_modules/react.js";
import css from "https://unpkg.com/csz";
export default (() => React.createElement("div", {
  className: css`/src/index.css`
}, React.createElement("article", null, React.createElement("div", {
  className: "nav-bar"
}, React.createElement("div", null, ['Biz home', 'overview', 'uses', 'resources'].map(name => React.createElement("div", null, name)))), React.createElement("div", {
  className: "second"
}, React.createElement("div", null, "get your team in sync")), React.createElement("div", {
  className: "third"
}, "third"))));