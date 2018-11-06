const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const passport = require('passport');
const cfg = require('./config');
const auth = require('./auth');

const app = express();
dotenv.config();

const db = require('./db');
const secure = require('./secure')(db);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.NODE_ENV === 'production' && db.engine === 'lowdb') {
  console.info('You are using json file as database on production environment'); // eslint-disable-line no-console
}

app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const sess = {
  secret: cfg.session_secret,
  resave: false,
  saveUninitialized: false,
  cookie: {},
};

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // Trust first proxy
  sess.cookie.secure = true; // Serve secure cookies
}

app.use(session(sess));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth(db));
app.use('/secure', secure);

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/signin', (req, res) => {
  res.render('signin');
});

app.use((req, res) => {
  res.sendStatus(404);
});

const listener = app.listen(PORT, HOST, () => {
  console.log(`Your app is listening on port ${listener.address().port}`); // eslint-disable-line no-console
});
