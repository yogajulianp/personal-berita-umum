var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')



const db = require('../models');
const Product = db.products;
const User = db.users;
const Op = db.Sequelize.Op;


//get all product
router.get('/product', function(req, res, next) {
  Product.findAll()
  .then(data => {
    res.render('product', { 
      title: 'Daftar Produk',
      products: data,
     });
     //console.log(products);
  })
  .catch(err => {
    res.render('product', { 
      title: 'Daftar Produk',
      products: [],
     });
  })
});



//addUser
router.get('/register', function(req, res, next) {
  res.render('registerForm', { title: 'Register' });
});

//add User
router.post('/register', function(req, res, next) {
  var salt = bcrypt.genSaltSync(10);
  var users = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt)

  }
  User.create(users)
  .then(addData => {
    res.redirect('/product/login')
   
  })
  .catch(err => {
    res.json({
      info: "Error",
      message: err.message
    });
  });
});





module.exports = router;
