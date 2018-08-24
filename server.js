require('dotenv').config();
const cfg = require('./config');
const express = require('express');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

const db = require('./db/db-json');
//const db = require('./db/db-postgres');
//const db = require('./db/db-mongo');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(helmet());
app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname+'/pages/landing.html'));
});

app.get("/signup", (req, res)=>{
  res.sendFile(path.join(__dirname+'/pages/signup.html'));
});

app.get("/signin", (req, res)=>{
  res.sendFile(path.join(__dirname+'/pages/signin.html'));
});

app.get("/profile", (req, res)=>{
  res.sendFile(path.join(__dirname+'/pages/profile.html'));
});
var listener = app.listen(PORT, HOST,function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

