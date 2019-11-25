const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.load();
const notProduction = process.env.NODE_ENV !== "PRODUCTION"
let reload;
if (notProduction) reload = require('reload');
else app.use(express.static(buildDir));
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const development = false;

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
  let rep = req.session.rep
  console.log(46, process.env.NODE_ENV)
  if (process.env.authentication !== 'true') {
    rep = req.session.rep = 'nm'
  }
  res.send(JSON.stringify({ rep }));
});
app.get('/logout', cors(), (req, res) => {
  req.session.rep = null
  res.send(JSON.stringify('ok'));
});
app.post('/login', cors(), (req, res) => {
  const { username, password } = req.body
  if (process.env[username] === password) {
    console.log(47, 'yeah');
    const rep = username
    req.session.rep = username
    res.send(JSON.stringify(rep));
  } else res.send("false");
});
app.options('/visit', cors());

app.get('/visits', cors(), async (req, res) => {
  const dbres = await util.getVisits(req.session.rep);
  res.json(dbres);
});
app.options('/clinic', cors());

app.options('/provider', cors());
app.get('/getproviders', cors(), async (req, res) => {
  const dbres = await util.providersByRep(req.session.rep);
  res.end(JSON.stringify(dbres));
});
app.get('/getSpendingByDoctor/:clinicID', cors(), async (req, res) => {
  console.log(74, req.params)
  const dbres = await util.spendingByDoctor(req.session.rep, req.params.clinicID);
  console.log(75, dbres)
  res.end(JSON.stringify(dbres));
});
app.get('/getVisitsByClinic/:clinicID', cors(), async (req, res) => {
  const dbres = await util.visitsByClinic(req.session.rep);
  console.log(74, req.params, dbres)
  res.end(JSON.stringify(dbres));
});
/*
pass array of clinics to get all providers for each.
*/
app.post('/provider', cors(), async (req, res) => {
  const dbres = await util.addProvider({
    ...req.body,
    rep: req.session.rep,
  });
  // console.log('add provider', dbres);
  res.end(JSON.stringify(dbres));
});


app.post('/receipt', async (req, res) => {
  // console.log(99, req.body)
  await util.addPhoto(req)
})
app.get('/receipt', async (req, res) => {
  // console.log('receipt')

  const array = await util.receipt()
  const doc = array[0]
  res.contentType(doc.img.contentType);
  res.send(doc.img.data);
})

app.post('/visit', cors(), async (req, res) => {
  req.body.rep = req.session.rep;
  const dbres = await util.addVisit(req.body);
  console.log('add visit result', dbres);
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
// app.post('*', (req, res) => {
//   console.table(req.params)
//   res.status(404).send(JSON.stringify('route ' + req.params[0] + " does not exist"))
// })
const server = http.createServer(app);
if (notProduction) {
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
