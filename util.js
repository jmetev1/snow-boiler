const mongoose = require('mongoose');
const dotenv = require('dotenv');
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
  // debugger;
  return spendingByDoctor;
};

exports.checkMaxAndEmail = async (rep, spendingByDoctor) => {
  const maxSpend = 375;
  const overLimit = [];
  console.log(spendingByDoctor);
  for (let [key, value] of Object.entries(spendingByDoctor)) {
    if (value.amount > maxSpend) overLimit.push([key, value]);
  }
  return overLimit.length ? await email(overLimit, rep) : 'no email sent';
};

const email = (providers, rep) => {
  const result = providers.map(ar => {
    const [id, obj] = ar;
    const { amount, name } = obj;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: ['j.metevier@gmail.com', 'jmetev1@gmail.com'],
      // to: rep === 'jack' ? 'j.metevier@gmail.com' : process.env.BOSS_EMAIL,
      from: 'AIsupervisor@pgl.com',
      subject: 'approaching provider spending limit',
      html: `<strong>rep ${rep} has spent $${amount} at provider ${name}</strong>`,
    };
    sgMail.send(msg);
    return msg;
  });
  return result;
};
// exports.checkMaxAndEmail = async (rep) => {
//   const myVisits = await VisitModel.find({ rep });
//   const spendingByDoctor = myVisits.reduce((a, c) => {
//     const { providers, amountSpent } = c;
//     console.log(providers)
//     providers.forEach((p) => { a[p] = (a[p] || 0) + (amountSpent / providers.length); });
//     return a;
//   }, {});
//   const myProviders = await ProviderModel.find({ rep });
//   myProviders.forEach(({ name, _id }) => {
//     const amount = spendingByDoctor[_id];
//     if (amount) spendingByDoctor[_id] = {
//       amount, name,
//     };
//   });
//   const max = 375;
//   const overLimit = [];
//   for (let [key, value] of Object.entries(spendingByDoctor)) {
//     if (value.amount > max) overLimit.push([key, value])
//   }
//   console.log('check spending', overLimit);
//   if (overLimit.length) email(overLimit, rep);
//   return spendingByDoctor;
// };

exports.getVisits = async rep => {
  rep = rep === 'admin' ? {} : { rep };
  return await VisitModel.find(rep);
};
