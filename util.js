const mongoose = require('mongoose');
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
dotenv.load();
var fs = require('fs');
let databaseError;

const Models = require('./models');
const { ReceiptModel, VisitModel, ProviderModel, ClinicModel } = Models;

mongoose
  .connect(
    `mongodb://cain:${process.env.DBPW}@ds127783.mlab.com:27783/poolmap`,
    { connectTimeoutMS: 1000 }
  )
  .then(
    suc => {},
    err => (databaseError = err)
  );
const db = mongoose.connection;
db.on('error', e => (databaseError = e));

exports.addProvider = async (req, res, cb) => await ProviderModel.create(req);

exports.providersByRep = async rep => {
  const allProviders = await ProviderModel.find({ rep });
  return allProviders.reduce((a, c) => {
    const { clinic } = c;
    if (a[clinic]) a[clinic].push(c);
    else a[clinic] = [c];
    return a;
  }, {});
};

exports.getClinic = async rep => {
  return await ClinicModel.find(rep === 'admin' ? {} : { rep });
};

exports.addVisit = async (req, res, cb) => {
  const { _id, providers } = await VisitModel.create(req);
  if (_id) {
    //new way
    const emailResult = await exports.checkMaxAndEmail(
      req.rep,
      await this.totalsForProviders(providers)
    );
    debugger;
    return { _id, email: emailResult };

    //old way
    // const spendingByDoctor = await exports.spendingByDoctor(req.rep);

    // return { _id, email: await exports.checkMaxAndEmail(req.rep, spendingByDoctor) };
  }
};

exports.totalsForProviders = async providers => {
  const year = new Date().getFullYear();
  const min = year + '-01-01',
    max = year + '-12-31';
  const visits = await VisitModel.find({
    date: { $gte: min, $lte: max },
    providers: {
      $in: providers,
    },
  });
  const spendingByDoctor = visits.reduce((a, c) => {
    const { providers, amountSpent } = c;
    providers.forEach(p => {
      a[p] = (a[p] || 0) + amountSpent / providers.length;
    });
    return a;
  }, {});

  const myProviders = await ProviderModel.find();
  myProviders.forEach(({ name, _id }) => {
    const amount = spendingByDoctor[_id];
    if (amount)
      spendingByDoctor[_id] = {
        amount,
        name,
      };
  });
  return spendingByDoctor;
};

exports.addPhoto = async (name, req, res) =>
  await ReceiptModel.create({
    name,
    img: {
      data: fs.readFileSync(`./receipts/${name}.png`),
      contentType: 'image/png',
    },
  });

exports.receipt = async (_id, req, res) => await ReceiptModel.find({ _id });

exports.addClinic = async (req, res, cb) => await ClinicModel.create(req);

exports.visitsByClinic = async rep => {
  const visits = await VisitModel.find({ rep });
};
exports.spendingByDoctor = async (rep, clinic) => {
  console.log(63);
  const year = new Date().getFullYear();
  const min = year + '-01-01';
  const max = year + '-12-31';
  const query = { rep, date: { $gte: min, $lte: max } };
  if (clinic) query.clinic = clinic;
  const myVisitsThisYear = await VisitModel.find(query);
  const spendingByDoctor = myVisitsThisYear.reduce((a, c) => {
    const { providers, amountSpent } = c;
    providers.forEach(p => {
      a[p] = (a[p] || 0) + amountSpent / providers.length;
    });
    return a;
  }, {});
  rep = rep === 'admin' ? {} : { rep };
  const myProviders = await ProviderModel.find(rep);
  myProviders.forEach(({ name, _id }) => {
    const amount = spendingByDoctor[_id];
    if (amount)
      spendingByDoctor[_id] = {
        amount,
        name,
      };
  });
  return spendingByDoctor;
};

exports.checkMaxAndEmail = async (rep, spendingByDoctor) => {
  const maxSpend = 350;
  const overLimit = [];
  for (let [key, value] of Object.entries(spendingByDoctor)) {
    if (value.amount > maxSpend) overLimit.push([key, value]);
  }
  return overLimit.length ? await email(overLimit, rep) : 'no email sent';
};
const emailByRep = {
  nm: 'jmetev1@gmail.com',
};
const email = (providers, rep) =>
  providers.map(ar => {
    const { amount, name } = Array.isArray(ar) && ar[1];
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: [emailByRep[rep]],
      from: 'PGL_Monitoring_app@pgl.com',
      subject: 'approaching provider spending limit',
      html: `<strong>rep ${rep} has spent $${amount} at provider ${name}</strong>`,
    };
    if (amount > 399) {
      msg.subject = 'Exceeded provider spending limit';
      msg.to.push(process.env.BOSS_EMAIL);
    }
    sgMail.send(msg);
    return msg;
  });

exports.getVisits = async rep => {
  rep = rep === 'admin' ? {} : { rep };
  return await VisitModel.find(rep);
};
