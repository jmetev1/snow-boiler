import React, { Suspense, lazy, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { PrivateRoute, routeNames, Loading } from './Fields';

const App = ({ userPromise }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    userPromise
      .then(res => res.json())
      .then(user => {
        setUser(user);
        setLoading(false);
      })
      .catch(e => {
        throw new Error('app js setState on comp did mount');
      });
  }, [userPromise]);
  return loading ? (
    <Loading />
  ) : (
    <Router>
      <Route
        exact
        path="/"
        render={() =>
          user ? <Redirect to="/addVisit" /> : <Redirect to="/login" />
        }
      />
      <Suspense fallback={<Loading />}>
        {Object.keys(routeNames).map(string => (
          <PrivateRoute
            name={string.split(' ').join('')}
            key={string.split(' ').join('')}
            user={user}
          />
        ))}
        <Route
          path="/login"
          render={() => {
            const Component = lazy(() => import(`./Login`));
            return <Component setUser={setUser} user={user} />;
          }}
        />
        <Route
          path="/signup"
          render={() => {
            const Component = lazy(() => import(`./Signup`));
            return <Component setUser={setUser} user={user} />;
          }}
        />
      </Suspense>
    </Router>
  );
};

export default App;
