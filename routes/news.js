var express = require('express');
var router = express.Router();


const db = require('../models');
const News = db.news;
const Op = db.Sequelize.Op;

const auth = require('../auth')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//get all news
router.get('/', function(req, res, next) {

  News.findAll()
  .then(data => {
    res.render('index', { 
      title: 'Berita Saat ini',
      news: data,
     });
    
  })
  
  .catch(err => {
    res.render('news', { 
      title: 'Daftar Produk',
      news: [],
     });
  })
});

//add news
router.get('/addnews',auth, function(req, res, next) {
    res.render('addNews', { title: 'Tambah Berita' });
  });

//add news
router.post('/addnews',auth, function(req, res, next) {
  var news = {
    title: req.body.title,
    image: req.body.image,
    berita: req.body.berita,
  }
  News.create(news)
  .then(addData => {
    res.redirect('/')
   
  })
  .catch(err => {
    res.json({
      info: "Error",
      message: err.message
    });
  });
});

module.exports = router;