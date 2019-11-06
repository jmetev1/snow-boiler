const dotenv = require('dotenv');

dotenv.load();

// export const url = "http://pglebapp.mqhhuyuruj.us-east-2.elasticbeanstalk.com/"
// export const url = 
const proddata = process.env.REACT_APP_PROD_DATA
console.log('jack7', proddata)
export const url = '/'
// export const url = process.env.REACT_APP_PROD_DATA ? '/' : "http://localhost:3001/"
export const getMyClinics = () => fetch(url + 'clinic', { method: "GET", }).then(r => r.json())
// export const automatic = true;
export const automatic = false;
export const showState = false;