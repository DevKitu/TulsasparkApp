const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const csrf = require ('csurf');
const session = require('express-session');

const csrfProtection = csrf();

const config = require('./config/database');

const User = require('./models/user');
const Harvester = require('./models/harvester');
const Bbc = require('./models/bbc');
const Product = require('./models/product');
// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

// const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, useNewUrlParser: true }));

// app.use(csrfProtection);
// app.use(session({secret: config.secret, resave: false, saveUninitialized: false}));
/* 
  Set headers
*/

app.use((req, res, next)=> {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
                );
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PATCH, PUT, DELETE, OPTIONS"
                );
  next();

});


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passportOld')(passport);

// app.use('/users', users);

// USERS

/* POST an user to the server */
app.post('/api/register', (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const recData = req.body;
  console.log('url is : ', url);
  console.log('sent data is: ', recData);
  const user = new User({
    name: req.body.name,
    surName: req.body.surName,
    gender: req.body.gender,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    userName: req.body.userName,
    password: req.body.password,
    
  }); 
 // console.log(student);
  user.save().then( savedUser => {
    console.log("saved user result then ", savedUser);
    res.status(201).json({
      message: 'User added successfully',
      user: savedUser
    });
  });

});

/* GET users from the server BD */
app.get('/api/users', (req, res, next)=> {

  User.find()
          .then((document => {
            console.log(document);
            res.status(200).json({
            message: 'Users fetched successfuly',
            users: document
            });
          }));
});

/* GET user Token from the server BD */
app.get('/api/doregister', (req, res, next)=> {

  res.status(200).json({
    message: 'Users fetched successfuly',
    csrfToken: req.csrfToken()
    });

});
// HARVESTERS

/* POST an user to the server */
app.post('/api/harvester', (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const recData = req.body;
  console.log('url is : ', url);
  console.log('sent data is: ', recData);
  const harvester = new Harvester({
    name: req.body.name,
    surName: req.body.surName,
    idNumber: req.body.idNumber,
    gender: req.body.gender,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    bankDetails: req.body.bankDetails,
    address: req.body.address,
  }); 
  console.log("about to be saved result ", harvester);
  harvester.save().then( savedHarvester => {
    console.log("saved user result then ", savedHarvester);
    res.status(201).json({
      message: 'Haverster added successfully',
      harvester: savedHarvester
    });
  });

});

/* GET harvesters from the server BD */
app.get('/api/harvesters', (req, res, next)=> {

  Harvester.find()
          .then((document => {
            console.log(document);
            res.status(200).json({
            message: 'Harvester fetched successfuly',
            harvesters: document
            });
          }));
});

/* POST an Bbc to the server */
app.post('/api/bbc', (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const recData = req.body;
  console.log('url is : ', url);
  console.log('sent data is: ', recData);
  const bbc = new Bbc({
    name: req.body.name,
    address: req.body.address,
  }); 
  console.log("about to be saved result ", bbc);
  bbc.save().then( savedBbc => {
    console.log("saved user result then ", savedBbc);
    res.status(201).json({
      message: 'Bbc added successfully',
      bbc: savedBbc
    });
  });

});

/* GET Bbc from the server BD */
app.get('/api/bbcs', (req, res, next)=> {

  Bbc.find()
          .then((document => {
            console.log(document);
            res.status(200).json({
            message: 'Bbc fetched successfuly',
            bbcs: document
            });
          }));
});


/* POST an product to the server */
app.post('/api/product', (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const recData = req.body;
  console.log('url is : ', url);
  console.log('sent data is: ', recData);
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imagePath: req.body.imagePath,
    category: req.body.category,
  }); 
  console.log("about to be saved result ", product);
  product.save().then( savedProduct => {
    console.log("saved user result then ", savedProduct);
    res.status(201).json({
      message: 'Product added successfully',
      product: savedProduct
    });
  });

});

/* GET Product from the server BD */
app.get('/api/products', (req, res, next)=> {

  Product.find()
          .then((document => {
            console.log(document);
            res.status(200).json({
            message: 'Product fetched successfuly',
            products: document
            });
          }));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
