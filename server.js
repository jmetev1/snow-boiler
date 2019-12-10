const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const app = express();
const path = require("path");

const buildDir = path.join(__dirname, "build");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.load();
const notProduction = process.env.NODE_ENV !== "PRODUCTION";
let reload;
if (notProduction) reload = require("reload");
else app.use(express.static(buildDir));
const http = require("http");
const bodyParser = require("body-parser");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const fileupload = require("express-fileupload");

var store = new MongoDBStore(
  {
    // uri: `mongodb://cain:${process.env.DBPW}@ds127783.mlab.com:27783`,
    uri: `mongodb://cain:${process.env.DBPW}@ds127783.mlab.com:27783/poolmap`,
    databaseName: "poolmap",
    collection: "mySessions"
  },
  function(error, suc) {
    console.log(29, "error", error);
    console.log(30, suc);
    // Should have gotten an error
  }
);
const development = false;

const util = require("./util");

app.set("port", port);
app.use(
  session({
    name: "server-session-cookie-id",
    secret: "my express secret",
    store,
    saveUninitialized: true,
    resave: false
  }),
  fileupload()
);

app.use(bodyParser.json());

app.options("/login", cors());
app.get("/login", cors(), (req, res) => {
  let rep = req.session.rep;
  console.log(57, process.env.authentication);
  if (process.env.authentication !== "true") {
    rep = req.session.rep = "nm";
  }
  if (rep) res.send(JSON.stringify({ rep }));
  else res.json(false);
});

app.get("/logout", cors(), (req, res) => {
  req.session.rep = null;
  res.send(JSON.stringify("ok"));
});

app.post("/login", cors(), (req, res) => {
  const { username, password } = req.body;
  if (process.env[username] === password) {
    const rep = (req.session.rep = username);
    res.json(rep);
  } else res.send("false");
});
app.options("/visit", cors());

app.get("/visits", cors(), async (req, res) => {
  res.json(await util.getVisits(req.session.rep));
});
app.options("/clinic", cors());

app.options("/provider", cors());
app.get("/getproviders", cors(), async (req, res) => {
  res.json(await util.providersByRep(req.session.rep));
});

app.get("/getSpendingByDoctor/:clinicID", cors(), async (req, res) => {
  res.json(await util.spendingByDoctor(req.session.rep, req.params.clinicID));
});

app.get("/getVisitsByClinic/:clinicID", cors(), async (req, res) => {
  res.json(await util.visitsByClinic(req.session.rep));
});

/*pass array of clinics to get all providers for each.*/
app.post("/provider", cors(), async ({ body, session }, { json }) =>
  json(
    await util.addProvider({
      ...body,
      rep: session.rep
    })
  )
);

let name = "0.8708915141890314";
app.post("/receipt", async (req, res) => {
  name = Math.random().toString();
  const path = `./src/image/${name}.png`;
  req.files.myFile.mv(path, async function(err) {
    if (err) return res.status(500).send(err);
    res.json((await util.addPhoto(name))._id);
  });
});

app.get("/receipt/:receiptID", async (req, res) => {
  const [doc] = await util.receipt(req.params.receiptID);
  if (doc) {
    res.contentType(doc.img.contentType);
    res.send(doc.img.data);
  } else {
    res.send("no dice");
  }
});

app.post("/visit", cors(), async (req, res) => {
  res.json(await util.addVisit({ ...req.body, rep: req.session.rep }));
});

app.post("/clinic", cors(), async (req, res) =>
  res.json(
    await util.addClinic({
      ...req.body,
      rep: req.session.rep
    })
  )
);

app.get("/clinic", cors(), async (req, res) => {
  const allClinics = await util.getClinic(req.session.rep);
  res.send(JSON.stringify(allClinics));
});
// if (port === "3000") {
//   console.log(110, development)
//   app.get('*', cors(), (req, res) => {
//     res.send('no route')
//   })
// }
// app.post('*', (req, res) => {
//   console.table(req.params)
//   res.status(404).send(JSON.stringify('route ' + req.params[0] + " does not exist"))
// })
const server = http.createServer(app);
if (notProduction) {
  reload(app)
    .then(() => {
      server.listen(app.get("port"), () => {
        console.log(`Web server listening on port ${app.get("port")}`);
      });
    })
    .catch(err => {
      console.error(
        "Reload could not start, could not start server/sample app",
        err
      );
    });
} else {
  server.listen(app.get("port"), () => {
    console.log(`Web server listening on port ${app.get("port")}`);
  });
}

module.exports = app;
