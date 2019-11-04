const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const cors = require('cors');

let reload;
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
// const dotenv = require('dotenv');
// dotenv.load();
const development = false;
app.use(express.static(buildDir));

const util = require('./util');

app.set('port', port);
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: false,
}));

app.use(bodyParser.json());

const map = {
  'North Louisiana': 'nl',
  'North Mississippi': 'nm',
  'South Louisiana': 'sl',
  'South Mississippi': 'sm',
};

app.options('/login', cors());
app.get('/login', cors(), (req, res) => {
  if (req.session.rep !== 'nm') {
    req.session.rep = 'nm';
  }
  console.log(req.session.rep);
  const info = {
    rep: req.session.rep,
    env: process.env.NODE_ENV,
    new: 'the newest'
  };
  res.send(JSON.stringify(info));
});
app.post('/login', cors(), (req, res) => {
  const rep = map[req.body.rep] || false;
  req.session.rep = rep;
  console.log(47, req.session);
  res.send(JSON.stringify(rep));
});
app.options('/visit', cors());

app.get('/visits', cors(), async (req, res) => {
  // const dbres = await util.getVisits();
  const dbres = await util.checkSpending(req.session.rep);
  res.json([dbres]);
});
app.options('/clinic', cors());


app.options('/provider', cors());
app.get('/getproviders', cors(), async (req, res) => {
  const dbres = await util.providersByRep(req.session.rep);
  res.end(JSON.stringify(dbres));
});
/*
pass array of clinics to get all prviders for each.
*/
app.post('/provider', cors(), async (req, res) => {
  console.log('add provider', req.body, req.session);
  const dbres = await util.addProvider({
    ...req.body,
    rep: req.session.rep,
  });
  res.end(JSON.stringify(dbres));
});



app.post('/visit', cors(), async (req, res) => {
  req.body.rep = req.session.rep;
  console.log(21, req.body);
  // console.log()
  const dbres = await util.addVisit(req.body);
  // console.log(21, dbres);
  res.end(JSON.stringify(dbres));
});
app.post('/clinic', cors(), async (req, res) => {
  console.log('add clinic', req.body, req.session);
  const dbres = await util.addClinic({
    ...req.body,
    rep: req.session.rep,
  });
  console.log(98, dbres)
  res.end(JSON.stringify(dbres));
});




app.get('/clinic', cors(), async (req, res) => {
  const allClinics = await util.getClinic(req.session.rep);
  res.end(JSON.stringify(allClinics));
});
// if (port === "3000") {
//   console.log(110, development)
//   app.get('*', cors(), (req, res) => {
//     res.end('no route')
//   })
// }

const server = http.createServer(app);
if (development) {
  reload(app).then(() => {
    server.listen(app.get('port'), () => {
      console.log(`Web server listening on port ${app.get('port')}`);
    });
  }).catch((err) => {
    console.error('Reload could not start, could not start server/sample app', err);
  });
} else {
  server.listen(app.get('port'), () => {
    console.log(`Web server listening on port ${app.get('port')}`);
  });
}

module.exports = app;
