const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.load();
const mongoDB = `mongodb://cain:${process.env.DBPW}@ds127783.mlab.com:27783/poolmap`;
let databaseError;

mongoose.connect(mongoDB, {
  connectTimeoutMS: 1000,
}).then((suc) => { }, (err) => { databaseError = err; });
const db = mongoose.connection;
db.on('error', (e) => {
  // console.log(13, e)
  databaseError = e;
  // console.error.call(console, 'MongoDB connection error:');
});

const { Schema } = mongoose;

const ProviderSchema = new Schema({
  name: String,
  ytdTotal: Number,
  type: String,
  clinic: String,
  rep: String,
});
const ProviderModel = mongoose.model('ProviderModel', ProviderSchema);
exports.addProvider = async (req, res, cb) => {
  console.log('add provider', req);
  const dbres = await ProviderModel.create(req)
  return dbres;
};
exports.providersByRep = async (rep) => {
  const allProviders = await ProviderModel.find({ rep });
  const providersByClinic = allProviders.reduce((a, c) => {
    const { clinic } = c;
    if (a[clinic]) a[clinic].push(c);
    else a[clinic] = [c];
    return a;
  }, {});
  return providersByClinic;
};

const ClinicSchema = new Schema({
  name: String,
  providers: [ProviderSchema],
  address: String,
  rep: String,
});
const ClinicModel = mongoose.model('ClinicModel', ClinicSchema);
exports.getClinic = async (rep) => {
  const clinics = await ClinicModel.find({ rep });
  return clinics;
};
exports.addVisit = async (req, res, cb) => VisitModel.create(req, (err, suc) => {
  console.log(84, req);
  return suc;
});

exports.addClinic = async (req, res, cb) => {
  let dbres = await ClinicModel.create(req)
  console.log(66, dbres)
  return dbres;
};
// const RepSchema = new Schema({
//   name: String,
// });
const VisitSchema = new Schema({
  rep: String,
  date: String,
  purpose: String,
  materials: String,
  amountSpent: Number,
  receipt: String,
  providers: [String],
  clinic: String,
});
exports.checkSpending = async (rep) => {
  const year = new Date().getFullYear()
  // const year = '2020'
  const min = year + '-01-01';
  const max = year + '-12-31'
  const myVisitsThisYear = await VisitModel.find({
    date: { $gte: min, $lte: max }
  });
  const spendingByDoctor = myVisitsThisYear.reduce((a, c) => {
    const { providers, amountSpent } = c;
    console.log(providers)
    providers.forEach((p) => { a[p] = (a[p] || 0) + (amountSpent / providers.length); });
    return a;
  }, {});
  const myProviders = await ProviderModel.find({ rep });
  myProviders.forEach(({ name, _id }) => {
    const amount = spendingByDoctor[_id];
    if (amount) spendingByDoctor[_id] = {
      amount, name,
    };
  });
  const maxSpend = 375;
  const overLimit = [];
  for (let [key, value] of Object.entries(spendingByDoctor)) {
    if (value.amount > maxSpend) overLimit.push([key, value])
  }
  console.log('check spending', overLimit);
  // if (overLimit.length) email(overLimit, rep);
  return spendingByDoctor;
};

const VisitModel = mongoose.model('VisitModel', VisitSchema);
const email = (ar, rep) => {
  console.log('were emailing')
  ar.forEach(ar => {
    const [id, obj] = ar;
    const { amount, name } = obj
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: process.env.BOSS_EMAIL,
      from: 'AIsupervisor@pgl.com',
      subject: 'approaching provider spending limit',
      html: `<strong>rep ${rep} has spent $${amount} at provider ${name}</strong>`,
    };
    sgMail.send(msg);
  })
}
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

exports.getVisits = async (req, res, cb) => {
  let result;
  await VisitModel.find({}, (err, docs) => {
    result = err || docs;
  });
  console.log(116, result);
  // const cache = [];
  // JSON.stringify(circ, function (key, value) {
  //   if (typeof value === 'object' && value !== null) {
  //     if (cache.indexOf(value) !== -1) {
  //       // Duplicate reference found, discard key
  //       return;
  //     }
  //     // Store value in our collection
  //     cache.push(value);
  //   }
  //   return value;
  // });
  // cache = null; // Enable garbage collection
  // return databaseError ? JSON.stringify(process.env) + databaseError : dbres;
  return result;
};
// const Schema = mongoose.Schema;
// const UserSchema = new Schema({
//   username: String,
//   password: String,
// });
// const UserModel = mongoose.model('UserModel', UserSchema);
// const UserOrCollection = new UserModel({
//   username:'Cain',
//   password: 'Cain'
// })
// UserOrCollection.save((err, created)=> {
//   if (err) {
//     console.log(err);
//   }
//   // console.log(created);
// })
// UserModel.create({
//   username: 'jacques',
//   password: 'woah'
// }, (err, instance) => {
//   if (err) return handleError(err)
//   console.log(instance);
// })

// UserModel.find((err, user) => {
//   console.log('inside find');
//   if (err){
//     console.error(err)
//   }
//   console.log(user, 'this is finidng');
// })
