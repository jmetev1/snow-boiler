import React, { useState } from "/web_modules/react.js";
import AddVisit from "../build/AddVisit.js";
import { Pretty } from "../build/Fields.js";

const App = ({
  userPromise
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);
  return React.createElement(Pretty, null, React.createElement(AddVisit, null));
};

export default App;