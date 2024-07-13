const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path =require('path');
const methodOverride = require('method-override');
//ejs mate for basixc layout of each page
const ejsmate=require('ejs-mate');
// Corrected path for local MongoDB
const mongoURL = 'mongodb://localhost:27017/rentify'; 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// Use relative path for requiring modules
const Listing = require('./models/listing');
app.use(express.urlencoded({extended:true}));
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
//over ride method beacause HTML support only get request
    app.use(methodOverride('_method'));
    app.engine('ejs',ejsmate);
    const { ObjectId } = mongoose.Types; // Import ObjectId

    const session = require('express-session');
    // Session middleware
app.use(session({
    secret: 'yourSecretKey', // Replace with a strong secret
    resave: false,
    saveUninitialized: true
  }));
//expreess will go for public folder to file styling
  app.use(express.static(path.join('__dirname','public')));
app.get('/', (req, res) => {
    res.send('Hey, I\'m here');
});

app.get('/listingtest', (req, res) => {
    console.log('Testing');
});
//index route
app.get('/listings',async(req,res)=>{
    const allistings=await Listing.find({});
    res.render('./listings/index.ejs',{allistings});


});
//new route comes above of show route beacuse it think new as id and give no found error in db
app.get('/listings/new',async(req,res)=>{
    res.render('./listings/new.ejs');
});
//show route
app.get('/listings/:id',async(req,res)=>{
    let {id}=req.params;
    const listdata=await Listing.findById(id);
    res.render('./listings/show.ejs',{listdata});
});
//post route for form
app.post('/listings',async(req,res)=>{
  
   let newformlist= await new Listing(req.body.listing);
   console.log(newformlist);
   await newformlist.save();
   res.redirect('/listings');


});
app.get('/listings/:id/edit',async(req,res)=>{
    let {id}=req.params;
    const listdata=await Listing.findById(id);
    res.render('./listings/edit.ejs',{listdata});

});
app.post('/listing/editsubmit/:id', async (req, res) => {
    try {
        const {id} = req.params;  // Ensure to pass the listing ID if needed
        const updatedData = req.body.listing;
        console.log(updatedData);
        console.log(id);
        
        await Listing.findByIdAndUpdate(id, updatedData);
        
        res.redirect(`/listings/${id}`);  // Redirect to the updated listing page
    } catch (error) {
        console.error('Error updating listing:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete route
app.delete('/listings/:id', async (req, res) => {
    try {
      const listingId = req.params.id;
  
      // Debugging: Log the value
      console.log('Listing ID:', listingId);
  
      // Validate the ID
      if (!ObjectId.isValid(listingId)) {
        return res.status(400).send({ error: 'Invalid ID format' });
      }
  
      const result = await Listing.findByIdAndDelete(listingId);
  
      if (!result) {
        return res.status(404).send({ error: 'Listing not found' });
      }
  
      req.session.message = 'Listing deleted successfully';
      setTimeout(() => {
        res.redirect('/listings');
      }, 2000);
     
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });
  



const port = 4000;
app.listen(port, () => {
    console.log('Listening');
});
