var express = require('express');
var router = express.Router();


const db = require('../models');
const News = db.news;
const Op = db.Sequelize.Op;

const auth = require('../auth')

//addProduct
router.get('/addnews',auth, function(req, res, next) {
    res.render('addNews', { title: 'Tambah Berita' });
  });

module.exports = router;