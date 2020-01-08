import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { url } from './url';
import { ErrorBoundary } from './ErrorBoundary';

if (!window.pglOptions) window.pglOptions = {};
const user = fetch(url + 'login', { credentials: 'include' });

ReactDOM.render(
  <ErrorBoundary>
    <StrictMode>
      <App userPromise={user} />
    </StrictMode>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
