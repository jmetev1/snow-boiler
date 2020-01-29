const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// const buildDir = path.join(__dirname, 'build');
dotenv.load();
let development = process.env.NODE_ENV === 'development';
app.use(express.static(__dirname));
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore(
  {
    uri: `mongodb://cain:${process.env.DBPW}@ds127783.mlab.com:27783/poolmap`,
    databaseName: 'poolmap',
    collection: 'mySessions',
  },
  (error, suc) => {}
);
// const db = require('./db');

app.set('port', process.env.PORT || 3001);
app.use(
  session({
    name: 'server-session-cookie-id',
    secret: 'my express secret',
    store,
    saveUninitialized: true,
    resave: false,
  }),
  bodyParser.json()
);

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`Web server listening on port ${app.get('port')}`);
});

module.exports = app;
