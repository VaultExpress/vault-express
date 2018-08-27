const express = require('express');
const router = express.Router();

module.exports = function(db) {

  router.get('/profile', (req, res) => {
    res.send('profile.....');
  });

  return router;
};
