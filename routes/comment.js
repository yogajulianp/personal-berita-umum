var express = require('express');
var router = express.Router();


const db = require('../models');
const Comment = db.comments;
const Op = db.Sequelize.Op;

//add komentar
router.get('/addkomentar',auth, function(req, res, next) {
  res.render('addKomentar', { title: 'Tambah Product' });
});

//add Komentar
router.post('/addkomentar',auth, function(req, res, next) {
  var products = {
    name: req.body.name,
    comment: req.body.comment,

  }
  Comment.create(products)
  .then(addData => {
    res.redirect('/product')
   
  })
  .catch(err => {
    res.json({
      info: "Error",
      message: err.message
    });
  });
});

module.exports = router;
