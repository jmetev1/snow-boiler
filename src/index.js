import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Pretty } from '../build/Fields.js';
import AddVisit from '../build/AddVisit.js';
import Home from './Home.js';

ReactDOM.render(
  <Pretty>
    <Home />
    {/* <AddVisit /> */}
    {/* not addvisit */}
  </Pretty>,
  document.getElementById('root')
);
