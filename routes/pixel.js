var express = require('express');
var router = express.Router();

/* GET pixel.gif listing. */
router.get('/', function(req, res, next) {
  res.status(200).send('Received');
});

module.exports = router;