var express = require('express');
var router = express.Router();


const db = require('../models');
const Comment = db.comments;
const Op = db.Sequelize.Op;

//get komentar
router.get('/', function(req, res, next) {
  Comment.findAll()
  .then(data => {
    res.render('commentsCard', { 
      title: 'Komentar',
      comments: data,
     });
  })
  
  .catch(err => {
    res.render('commentsCard', { 
      title: 'Komentar',
      comments: [],
     });
  })
});

//addKomentar
router.get('/add', function(req, res, next) {
  res.render('addComments', { title: 'Tambah Komentar' });
});

//add Komentar
router.post('/add', function(req, res, next) {
  var comments = {
    name: req.body.name,
    comment: req.body.comment,

  }
  Comment.create(comments)
  .then(addData => {
    res.redirect('/comments')
   
  })
  .catch(err => {
    res.json({
      info: "Error",
      message: err.message
    });
  });
});

module.exports = router;
