const mongoose=require('mongoose');
const initialdata=require('./data');
const listing=require('../models/listing.js');
const Listing = require('../models/listing');
const mongoURL = 'mongodb://localhost:27017/rentify'; 
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const inidb=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initialdata.data);
    console.log('database intialized');

};
inidb();

