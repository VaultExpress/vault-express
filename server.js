require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname+'/pages/index.html'));
});

var listener = app.listen(PORT, HOST,function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

