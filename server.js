require('dotenv').config();
const cfg = require('./config');
const express = require('express');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");

const db = require('./db');
const api = require('./api')(db);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(helmet());
app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(session({
  secret: cfg.session_secret,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', require('./auth')(db));

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname+'/pages/landing.html'));
});

app.get("/signup", (req, res)=>{
  res.sendFile(path.join(__dirname+'/pages/signup.html'));
});

app.get("/signin", (req, res)=>{
  res.sendFile(path.join(__dirname+'/pages/signin.html'));
});

app.use("/api", api);

app.get("/profile", (req, res)=>{
  res.sendFile(path.join(__dirname+'/pages/profile.html'));
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

var listener = app.listen(PORT, HOST,function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

