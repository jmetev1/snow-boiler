const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.load();
const mongoDB = `mongodb://cain:${process.env.DBPW}@ds127783.mlab.com:27783/poolmap`;
let databaseError;

mongoose.connect(mongoDB, {
  connectTimeoutMS: 1000,
}).then((suc) => { }, (err) => { databaseError = err; },
);
const db = mongoose.connection;
db.on('error', () => {
  databaseError = 'some error';
  console.error.call(console, 'MongoDB connection error:');
});

const { Schema } = mongoose;

const ProviderSchema = new Schema({
  name: String,
  ytdTotal: Number,
  type: String,
  clinic: String,
  rep: String
})
const ProviderModel = mongoose.model("ProviderModel", ProviderSchema);
exports.addProvider = async (req, res, cb) => {
  console.log('add provider', req)
  const dbres = await ProviderModel.create(req, (err, suc) => {
    if (err) console.log('err', err)
    else console.log('in provider util success', suc);
    return suc;
  });
  return dbres;
};
exports.providersByRep = async (rep) => {
  const allProviders = await ProviderModel.find({ rep });
  const providersByClinic = allProviders.reduce((a, c) => {
    const { clinic } = c;
    if (a[clinic]) a[clinic].push(c)
    else a[clinic] = [c]
    return a;
  }, {})
  return providersByClinic
}

const ClinicSchema = new Schema({
  name: String,
  providers: [ProviderSchema],
  address: String,
  rep: String
})
const ClinicModel = mongoose.model("ClinicModel", ClinicSchema)
exports.getClinic = async (rep) => {
  const clinics = await ClinicModel.find({ rep: rep })
  return clinics
};
exports.addClinic = async (req, res, cb) => {
  const dbres = await ClinicModel.create(req, (err, suc) => {
    if (err) console.log('err', err)
    else console.log('in util success', suc);
    return suc;
  });
  return dbres;
};
const RepSchema = new Schema({
  name: String,
})
const VisitSchema = new Schema({
  rep: String,
  date: String,
  purpose: String,
  materials: String,
  amountSpent: Number,
  receipt: String,
  providers: [String],
  clinic: String
});

const VisitModel = mongoose.model('VisitModel', VisitSchema);

exports.addVisit = async (req, res, cb) => {
  return VisitModel.create(req, (err, suc) => {
    console.log(84, req)
    return suc;
  });
};

exports.checkSpending = async (rep) => {
  const myVisits = await VisitModel.find({ rep });
  const spendingByDoctor = myVisits.reduce((a, c) => {
    const { providers, amountSpent } = c;
    providers.forEach(p => a[p] = (a[p] || 0) + (amountSpent / providers.length))
    return a;
  }, {})
  const myProviders = await ProviderModel.find({ rep });
  myProviders.forEach(({ name, _id }) => {
    const amount = spendingByDoctor[_id]
    if (amount) {
      spendingByDoctor[_id] = {
        amount, name
      }
    }
  })
  console.log('check spending', spendingByDoctor)

  return spendingByDoctor
}

exports.getVisits = (req, res, cb) => {
  const dbres = VisitModel.find();
  return databaseError ? JSON.stringify(process.env) + databaseError : dbres;
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
