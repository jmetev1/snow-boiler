function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Suspense, lazy, useState, useEffect } from "/web_modules/react.js";
import { BrowserRouter as Router, Route, Redirect, Switch } from "/web_modules/react-router-dom.js";
import { routeNames, Loading, Pretty } from "./Fields.js";

const App = ({
  userPromise
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    userPromise.then(res => {
      c(res);
      res.json();
    }).then(user => {
      c(user);
      setUser(user);
      setLoading(false);
    }).catch(e => {
      throw new Error('app js setState on comp did mount');
    });
  }, [userPromise]);
  return loading ? React.createElement(Loading, null) : React.createElement(Router, null, React.createElement(Suspense, {
    fallback: React.createElement(Loading, null)
  }, React.createElement(Switch, null, Object.keys(routeNames).map(string => {
    const componentName = string.split(' ').join('');
    return React.createElement(Route, {
      key: componentName,
      path: `/${componentName.toLowerCase()}`,
      render: props => {
        if (!user) return React.createElement(Redirect, {
          to: "/login"
        });else {
          const Component = lazy(() => import(`./${componentName}.js`));
          return React.createElement(Pretty, {
            user: user
          }, React.createElement(Component, _extends({}, props, {
            user: user
          })));
        }
      }
    });
  }), React.createElement(Route, {
    path: "/login",
    render: () => {
      const Component = lazy(() => import(`./Login.js`));
      return React.createElement(Component, {
        setUser: setUser,
        user: user
      });
    }
  }), React.createElement(Route, null, React.createElement(Redirect, {
    to: user ? '/addvisit' : '/login'
  })))));
};

export default App;