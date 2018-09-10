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
const secure = require('./secure')(db);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.NODE_ENV !== 'development' && db.engine === 'lowdb') {
  console.info('You are using json file as database on production environment');
}

app.use(helmet());
app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: cfg.session_secret,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', require('./auth')(db));
app.use('/secure', secure);

app.get("/", (req, res)=>{
  res.render('landing');
});

app.get("/signup", (req, res)=>{
  res.render('signup');
});

app.get("/signin", (req, res)=>{
  res.render('signin');
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

var listener = app.listen(PORT, HOST,function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
