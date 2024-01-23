var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  let rec = fs.readFileSync(path.resolve(__dirname, '../data/recommendations.json'));
  let data = fs.readFileSync(path.resolve(__dirname, '../data/introductionArray.json'));
  let por = fs.readFileSync(path.resolve(__dirname, "../data/portfolio.json"));
  res.render('index', {data: JSON.parse(rec), array: JSON.parse(data), cakes: JSON.parse(por)});
});



module.exports = router;
