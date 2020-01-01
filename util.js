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
  const result = await VisitModel.create(req);
  result.email = await exports.checkSpending(req.rep);
  console.log(result.email);
  return result;
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
console.log(89);
exports.checkSpending = async rep => {
  const spendingByDoctor = await exports.spendingByDoctor(rep);
  const maxSpend = 375;
  const overLimit = [];
  console.log(spendingByDoctor);
  for (let [key, value] of Object.entries(spendingByDoctor)) {
    if (value.amount > maxSpend) overLimit.push([key, value]);
    console.log(value.amountSpent, maxSpend);
  }
  console.log(113, 'check spending', rep, overLimit);
  const result = overLimit.length
    ? await email(overLimit, rep)
    : 'no email sent';
  return result;
};

const email = (toSend, rep) => {
  console.log('were emailing');

  const result = toSend.map(ar => {
    const [id, obj] = ar;
    const { amount, name } = obj;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: rep === 'jack' ? 'j.metevier@gmail.com' : process.env.BOSS_EMAIL,
      from: 'AIsupervisor@pgl.com',
      subject: 'approaching provider spending limit',
      html: `<strong>rep ${rep} has spent $${amount} at provider ${name}</strong>`,
    };
    sgMail.send(msg);
    return msg;
  });
  return result;
};
// exports.checkSpending = async (rep) => {
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
