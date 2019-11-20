const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logoPath = "./src/image/pglogo.webp"
dotenv.load();
const mongoDB = `mongodb://cain:${process.env.DBPW}@ds127783.mlab.com:27783/poolmap`;
let databaseError;
var fs = require('fs')
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

exports.getClinic = async (rep) => await ClinicModel.find(rep === 'admin' ? {} : { rep });

exports.addVisit = async (req, res, cb) => await VisitModel.create(req);

var ReceiptSchema = new Schema({
  img: { data: Buffer, contentType: String }
});

const ReceiptModel = mongoose.model('ReceiptModel', ReceiptSchema);
exports.addPhoto = (req, res) => {
  const logo = new ReceiptModel();
  // logo.img.data = fs.readFileSync(logoPath);
  console.log(68, req.body)
  logo.img.data = req.body
  logo.img.contentType = 'image/webp'
  logo.save((err, suc) => {
    if (err) console.log('error', err)
    else console.log('success', suc)
  })
}
exports.receipt = async (req, res) => {
  const photo = await ReceiptModel.find();
  console.log(76, photo, typeof photo)
  return photo
}

exports.addClinic = async (req, res, cb) => {
  let dbres = await ClinicModel.create(req)
  console.log(66, dbres)
  return dbres;
};

const VisitSchema = new Schema({
  rep: String,
  date: String,
  purpose: String,
  materials: String,
  amountSpent: Number,
  receipt: String,
  providers: [String],
  clinic: String,
  clinicName: String
});

exports.visitsByClinic = async (rep) => {
  const visits = await VisitModel.find({ rep });
}
exports.spendingByDoctor = async (rep, clinic) => {
  const year = new Date().getFullYear()
  const min = year + '-01-01';
  const max = year + '-12-31'
  const query = { date: { $gte: min, $lte: max } }
  if (clinic) query.clinic = clinic
  const myVisitsThisYear = await VisitModel.find(query);
  const spendingByDoctor = myVisitsThisYear.reduce((a, c) => {
    const { providers, amountSpent } = c;
    providers.forEach((p) => { a[p] = (a[p] || 0) + (amountSpent / providers.length); });
    return a;
  }, {});
  rep = rep === 'admin' ? {} : { rep }
  const myProviders = await ProviderModel.find(rep);
  myProviders.forEach(({ name, _id }) => {
    const amount = spendingByDoctor[_id];
    if (amount) spendingByDoctor[_id] = {
      amount, name,
    };
  });
  return spendingByDoctor;
}
exports.checkSpending = async (rep) => {
  // const year = new Date().getFullYear()
  // const min = year + '-01-01';
  // const max = year + '-12-31'
  // const myVisitsThisYear = await VisitModel.find({
  //   date: { $gte: min, $lte: max }
  // });
  // const spendingByDoctor = myVisitsThisYear.reduce((a, c) => {
  //   const { providers, amountSpent } = c;
  //   console.log(providers)
  //   providers.forEach((p) => { a[p] = (a[p] || 0) + (amountSpent / providers.length); });
  //   return a;
  // }, {});
  // const myProviders = await ProviderModel.find({ rep });
  // myProviders.forEach(({ name, _id }) => {
  //   const amount = spendingByDoctor[_id];
  //   if (amount) spendingByDoctor[_id] = {
  //     amount, name,
  //   };
  // });
  const spendingByDoctor = exports.spendingByDoctor(rep)
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

exports.getVisits = async (rep) => {
  rep = rep === 'admin' ? {} : { rep }
  let result = await VisitModel.find(rep)
  console.log(116, result, rep);

  return result;
};
